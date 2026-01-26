# Proposal: Evolving Signal K Schema Management with TypeBox

## Executive Summary

This proposal suggests an incremental evolution of Signal K's schema management, building on existing packages and infrastructure. The goal is to consolidate documentation, reduce maintenance burden, and improve the developer experience — while preserving Signal K's dynamic data model.

The approach: evolve what exists, don't replace it wholesale.

## Current State

### What We Have Today

Signal K has several interconnected pieces for schema and type management:

1. **Specification Repo** (`github.com/SignalK/specification`)
   - JSON Schema files defining the data model
   - Protocol specification (delta messages, subscriptions, etc.) in prose
   - Well-known paths and units
   - Published in HTML format at https://signalk.org/specification/latest/doc/ with print-to-PDF support

2. **`@signalk/signalk-schema` Package**
   - Machine-readable specification (JSON Schema + `keyswithmetadata.json`)
   - Validation utilities used by nmea0183 and n2k converters' tests
   - Source of metadata for the server
   - Derived from the specification repo

3. **`@signalk/server-api` Package**
   - TypeScript types for server APIs and Signal K domain objects (Deltas, etc.)
   - Used in server core, plugins, and clients
   - Actively maintained and widely used

4. **Server OpenAPI** (hand-written JSON files)
   - REST API documentation for v2 granular APIs
   - Swagger UI at `/admin/openapi`

5. **Server Documentation**
   - Added another home for documentation alongside the specification
   - Creates some overlap and confusion about where to find things

### What's Working

- `@signalk/server-api` provides useful TypeScript types used across the ecosystem
- `@signalk/signalk-schema` provides validation for converters
- v2 granular APIs are well-documented with OpenAPI/Swagger
- The specification supports comprehensive documentation including print-to-PDF

### Pain Points

- Documentation is spread across multiple locations, making it hard to find the right information
- OpenAPI docs, TypeScript types, and written documentation are separate, requiring manual maintenance
- Specification documentation promotes the full model, but real-world usage is centered on deltas — this can mislead new users
- Protocol documentation is prose-only, with no support for spec-based integration
- JSON Schema is not user-friendly for adding well-known paths and units
- There is no comprehensive client-side library with a type-supported API to make consuming Signal K data easy

### What Must Be Preserved

Signal K's dynamic data model is a core strength:

- The system passes arbitrary data not defined in well-known paths
- Plugins and clients can inject metadata for custom paths
- v1 schema and HTTP API remain relevant for simple path-value updates where no v2 API exists
- This flexibility must not be compromised

## Proposed Direction

### Guiding Principles

1. **Evolve, don't replace** — Build on existing packages rather than creating new ones
2. **Incremental adoption** — Changes can be made gradually without breaking existing code
3. **Dynamic-first** — Custom and well-known paths use the same mechanisms
4. **Consolidate documentation** — One place to find things, embedded in server and published at demo.signalk.org

### What This Proposal IS

- Introducing TypeBox as the schema definition layer, integrated into existing packages
- Publishing all protocol and API documentation in a centralized fashion via the Admin UI and demo.signalk.org
- Adding AsyncAPI documentation for the WebSocket protocol
- Making it easier to maintain well-known paths and units
- Improving the developer experience for client-side consumption

### What This Proposal is NOT

- A wholesale replacement of existing packages
- Deprecation of v1 schema or the full model HTTP API
- A breaking change to the dynamic data model
- Type-per-path (see "Type Design" section below)

## Why TypeBox

### The Problem with JSON Schema Maintenance

JSON Schema is powerful but tedious to maintain by hand. Adding a new well-known path requires editing verbose JSON files, and there's no IDE support or type inference.

### TypeBox Advantages

TypeBox schemas ARE JSON Schema — they produce it natively, not through conversion. This means:

- Write schemas in TypeScript with full IDE support
- Get JSON Schema output automatically
- Runtime validation with excellent performance
- TypeScript types via `Static<typeof Schema>`

### Performance

TypeBox is significantly faster than alternatives:

| Operation | TypeBox | Zod | Ratio |
|-----------|---------|-----|-------|
| Schema compilation | ~0.3ms | ~2.1ms | 7× faster |
| Object validation | ~0.02ms | ~0.15ms | 7-8× faster |
| Array (1000 items) | ~1.2ms | ~12ms | 10× faster |

*Benchmarks from [moltar/typescript-runtime-type-benchmarks](https://github.com/moltar/typescript-runtime-type-benchmarks)*

### JSON Schema Feature Support

TypeBox supports features that alternatives lack:

| Feature | TypeBox | Zod |
|---------|---------|-----|
| `patternProperties` | Native | Not supported |
| `$ref` references | Native | Requires configuration |
| `if`/`then`/`else` | Native | Not supported |

The `patternProperties` support is particularly relevant for Signal K's path patterns like `electrical.batteries.*.voltage`.

### AsyncAPI Compatibility

AsyncAPI (for documenting WebSocket protocols) uses JSON Schema for message definitions. TypeBox schemas work directly — no conversion step needed.

## Type Design: Value Categories, Not Type-Per-Path

### The Wrong Approach

Creating a type for every well-known path doesn't add value:

```typescript
// ❌ Not useful — what does this give us over `number`?
type SpeedOverGround = number
type DepthBelowSurface = number

// ❌ Naming collisions
type Current = number  // Electrical? Ocean?

// ❌ Doesn't help with dynamic/custom paths
type MyPluginCustomValue = ???
```

This approach also doesn't help with common tasks like "render all timestamp values the same way" — you'd have to enumerate every timestamp path.

### The Right Approach: Value Categories

Instead, define types for *categories of values*:

```typescript
// Value category types
type NumericValue = number
type TimestampValue = string  // ISO 8601
type PositionValue = { latitude: number; longitude: number; altitude?: number }
type AttitudeValue = { roll: number; pitch: number; yaw: number }
type StringValue = string
type BooleanValue = boolean

// Metadata describes what category a path belongs to
interface PathMetadata {
  description: string
  valueType: 'numeric' | 'timestamp' | 'position' | 'attitude' | 'string' | 'boolean'
  units?: string
  displayUnits?: string[]
}
```

### Why This Works

**For well-known paths**: Metadata is predefined and shipped with the schema package.

**For dynamic/custom paths**: Plugins inject metadata at runtime using the same structure. Custom paths are first-class citizens, not afterthoughts.

**For client code**: Generic handling becomes easy:

```typescript
// Render all timestamps consistently, regardless of path
function renderValue(path: string, value: unknown, metadata: PathMetadata) {
  switch (metadata.valueType) {
    case 'timestamp':
      return formatTimestamp(value as string)
    case 'numeric':
      return formatNumber(value as number, metadata.units, metadata.displayUnits)
    case 'position':
      return formatPosition(value as PositionValue)
    // ...
  }
}
```

### Building on What Exists

This is not a new invention — it's a formalization of what `keyswithmetadata.json` already does. That file already contains path descriptions, units, and type information. The proposal:

1. Expresses the same metadata structure in TypeBox (easier to maintain, IDE support)
2. Generates `keyswithmetadata.json` from TypeBox (backwards compatible)
3. Adds TypeScript types for the value categories (better client DX)
4. Keeps the same mental model that contributors already understand

Existing code consuming `keyswithmetadata.json` continues working unchanged. New code gets TypeScript support on top.

## Evolving Existing Packages

### `@signalk/signalk-schema`

Current role: Machine-readable spec, validation utilities, metadata source.

Evolution:
- Add TypeBox schema definitions alongside existing JSON Schema
- Generate JSON Schema from TypeBox (replaces hand-maintained JSON)
- Keep `keyswithmetadata.json` format, generate it from TypeBox
- Validation utilities can use TypeBox's compiled validators
- Existing consumers continue working — JSON Schema output is unchanged

### `@signalk/server-api`

Current role: TypeScript types for server APIs and domain objects.

Evolution:
- Import value-category types from `signalk-schema`
- Delta, Update, Source types enhanced with TypeBox (better inference)
- API request/response types generated from TypeBox schemas
- Existing code continues working — types remain compatible

### Relationship

```
@signalk/signalk-schema (source of truth)
├── TypeBox schemas for value categories
├── TypeBox schemas for protocol messages (Delta, etc.)
├── Path metadata registry
├── Generated: JSON Schema files
├── Generated: keyswithmetadata.json
└── Validation utilities (TypeBox-powered)

@signalk/server-api (consumer + extensions)
├── Re-exports core types from signalk-schema
├── Server-specific API types
└── Plugin development types
```

## AsyncAPI for WebSocket Protocol

### Why This Matters

Signal K's WebSocket protocol is documented only in prose. There's no machine-readable specification, no interactive documentation (like Swagger UI provides for REST), and no support for spec-based integration.

### What AsyncAPI Provides

AsyncAPI is the OpenAPI equivalent for event-driven APIs. It's mature (v3.0) and well-established in the IoT world.

| Capability | Today | With AsyncAPI |
|------------|-------|---------------|
| Protocol documentation | Prose only | Interactive, machine-readable |
| Message schemas | Implicit | Explicit, validated |
| Client code generation | Manual | Possible from spec |
| Integration support | Read the docs | Spec-based tooling |

### Complementary to OpenAPI

Both are needed:

| Spec | Protocol | Documents |
|------|----------|-----------|
| OpenAPI | REST | v2 granular HTTP APIs |
| AsyncAPI | WebSocket | Streaming protocol (deltas, subscriptions) |

Both would be generated from the same TypeBox schemas, ensuring consistency.

### Admin UI Integration

Add a navigation item alongside the existing OpenAPI/Swagger:
- **REST API** → Swagger UI (existing)
- **WebSocket API** → AsyncAPI UI (new)

## Documentation Consolidation

### Current Problem

Documentation is spread across:
- Specification repo (published at signalk.org/specification)
- Server repo docs
- OpenAPI in Admin UI
- README files in various packages

### Proposed Approach

Consolidate into the server, published via demo.signalk.org:

| Content | Location | Published At |
|---------|----------|--------------|
| REST API docs | Generated OpenAPI | `/admin/openapi` |
| WebSocket docs | Generated AsyncAPI | `/admin/asyncapi` |
| Path reference | Generated from metadata | `/admin/paths` or similar |
| Protocol concepts | Markdown in server repo | Linked from Admin UI |

The specification repo's HTML documentation could redirect to the consolidated location, or continue as a snapshot for versioned releases.

## Implementation Stages

### Stage 1: TypeBox in `signalk-schema` (Proof of Concept)

- Add TypeBox definitions for core value categories
- Add TypeBox definitions for Delta, Update, Source
- Generate JSON Schema from TypeBox
- Verify output matches existing schemas
- Existing consumers unaffected

### Stage 2: Path Metadata Enhancement

- Define path metadata structure in TypeBox
- Migrate well-known paths to TypeBox + metadata
- Generate `keyswithmetadata.json` from TypeBox
- Maintain backwards compatibility

### Stage 3: Server OpenAPI Migration

- Convert hand-written OpenAPI JSON to TypeBox
- Generate OpenAPI from TypeBox schemas
- Swagger UI continues working, now fed by generated spec
- Remove hand-maintained JSON files

### Stage 4: AsyncAPI Addition

- Create AsyncAPI document for WebSocket protocol
- Add AsyncAPI UI to Admin interface
- Document delta, subscription, hello messages

### Stage 5: Documentation Consolidation

- Consolidate protocol documentation in server
- Update links from specification repo
- Publish via demo.signalk.org

### Effort Estimate

| Stage | Scope | Effort | Risk |
|-------|-------|--------|------|
| Stage 1 | TypeBox proof of concept | Small | Low |
| Stage 2 | Path metadata migration | Medium | Low |
| Stage 3 | OpenAPI generation | Medium | Low |
| Stage 4 | AsyncAPI addition | Medium | Low |
| Stage 5 | Documentation consolidation | Small | Low |

All stages are incremental. Each provides value independently.

## Benefits Summary

| Benefit | Who It Helps |
|---------|--------------|
| Easier path/unit additions | Maintainers |
| IDE support for schema editing | Contributors |
| Generated OpenAPI (less maintenance) | Maintainers |
| AsyncAPI for WebSocket protocol | Client developers |
| Consolidated documentation | Everyone |
| Value-category types | Client developers |
| Dynamic paths as first-class | Plugin developers |
| Preserved backwards compatibility | Existing users |

## What Doesn't Change

- Signal K protocol semantics
- Dynamic data model (custom paths work as before)
- v1 schema and full model HTTP API (remain for simple values)
- Existing package APIs (evolve, don't break)
- `@signalk/server-api` role in ecosystem

## Open Questions

### Metadata Registry Location

Should path metadata live in `signalk-schema` or a separate registry?

**Recommendation**: Keep in `signalk-schema` alongside the value-category schemas. Single package for "what is Signal K data."

### AsyncAPI UI Choice

| Option | Pros | Cons |
|--------|------|------|
| AsyncAPI Studio | Full-featured | Heavier |
| AsyncAPI React component | Lightweight | Fewer features |

**Recommendation**: Start with React component for consistency with Admin UI.

### Schema Versioning

| Option | Pros | Cons |
|--------|------|------|
| Tied to package version | Simple | Schema change = release |
| Independent semver | Flexible | Coordination overhead |

**Recommendation**: Tie to package version. Schema changes are releases.

## References

- TypeBox: https://github.com/sinclairzx81/typebox
- AsyncAPI: https://www.asyncapi.com/
- TypeBox benchmarks: https://github.com/moltar/typescript-runtime-type-benchmarks
- Current specification: https://signalk.org/specification/latest/doc/
- `@signalk/signalk-schema`: https://www.npmjs.com/package/@signalk/signalk-schema
- `@signalk/server-api`: https://www.npmjs.com/package/@signalk/server-api
- demo.signalk.org: https://demo.signalk.org

---

*Prepared for Signal K maintainer discussion*
*January 2025*