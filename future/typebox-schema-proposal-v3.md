# Proposal: Server as Single Source of Truth for Signal K Schemas

## Executive Summary

This proposal addresses the current state of Signal K schema management and suggests consolidating all schema definitions into the server repository using TypeBox. The goal is to eliminate the dormant specification repository, unify validation and documentation, and provide machine-readable specifications for both REST and WebSocket protocols.

The key insight: the server already *is* the de facto specification. This proposal makes that explicit.

This work aligns with and supports the broader migration from v1 (full model) to v2 (granular APIs).

## Current State Analysis

### What We Have Today

1. **Specification Repo** (`github.com/SignalK/specification`)
   - JSON Schema files defining the v1 full data model
   - Protocol specification (delta messages, subscriptions, etc.) in prose
   - Well-known paths and units
   - Largely dormant — JSON Schema is tedious to maintain

2. **Server OpenAPI** (hand-written JSON files)
   - REST API documentation for v2 granular APIs
   - Swagger UI at `/admin/openapi`
   - Schemas duplicated between spec repo and server

3. **WebSocket Protocol**
   - Documented only in prose
   - No machine-readable specification
   - No interactive documentation (unlike REST with Swagger UI)

4. **Protocol Specification**
   - Largely still relevant conceptual documentation
   - Currently lives in specification repo
   - Needs a proper home

5. **`@signalk/server-api` Package**
   - TypeScript types for server APIs
   - Used by clients for type safety
   - Manually maintained, can drift from actual server behavior

### Pain Points

- JSON Schema is "not user friendly if all you want is add a few well known paths & units"
- Specification repo "looks abandoned because it largely is"
- v1 full model schema should be deprecated as part of v2 migration
- Protocol documentation is prose-only, hard for other implementations to consume
- Multiple sources of truth that drift out of sync
- No runtime validation tied to documentation
- Clients lack efficient delta validation mechanisms
- `@signalk/server-api` types are manually maintained, separate from actual schemas

## Proposed Direction

### Core Strategic Shift

**Current state**: Specification repo pretends to be the authority, but it's dormant. Server is the de facto specification.

**Proposed state**: Make this explicit. The server *is* the specification. TypeBox schemas in the server are the source of truth, everything else is generated.

### What This Proposal IS

- Consolidating all schema definitions into the server repository
- Using TypeBox for schema definitions with automatic generation of JSON Schema, OpenAPI, and AsyncAPI
- Providing machine-readable WebSocket protocol documentation via AsyncAPI
- Giving the protocol specification a proper home in the server repository
- Supporting the v1 → v2 migration by defining v2 APIs in TypeBox
- Enabling client-side TypeScript types and runtime validation from the same source
- Archiving the specification repository

### What This Proposal is NOT

- A rewrite of Signal K protocol semantics
- A breaking change to existing APIs
- Documentation of third-party plugin paths (plugins self-document)
- Replacing Swagger UI (we keep it, just feed it generated OpenAPI)

## Alignment with v2 Migration

This proposal directly supports the ongoing migration from v1 to v2:

| v1 Approach | v2 Approach | This Proposal |
|-------------|-------------|---------------|
| Full model schema | Granular API schemas | TypeBox defines v2 API schemas |
| Monolithic JSON Schema | Per-endpoint validation | TypeBox per-endpoint with composition |
| Hand-maintained | Generated | Single source generates all artifacts |

The v1 full model JSON Schema would be explicitly deprecated. New development focuses on v2 granular APIs defined in TypeBox.

## Why TypeBox over Zod

We evaluated both Zod and TypeBox for this use case. TypeBox is the better fit for Signal K's specific needs.

### Philosophy Difference

**Zod** was designed as a TypeScript-first validation library. JSON Schema output is an afterthought, handled by community packages.

**TypeBox** was designed specifically to produce JSON Schema as native output. The schema *is* the source of truth, and TypeScript types are derived from it.

### JSON Schema Fidelity

This is the critical dimension for generating accurate specifications and supporting other implementations.

| Feature | TypeBox | Zod + converters |
|---------|---------|------------------|
| JSON Schema output | Native (schemas ARE JSON Schema) | Requires conversion |
| `$ref` references | Native | Requires configuration |
| `patternProperties` | Native | Not supported |
| `if`/`then`/`else` | Native | Not supported |
| Draft 2020-12 support | Full | Limited |

**Signal K implication**: The `patternProperties` gap is significant. Signal K paths like `electrical.batteries.*.voltage` map naturally to JSON Schema's `patternProperties`, which TypeBox supports and Zod doesn't.

### Performance

TypeBox is significantly faster for both compilation and validation:

| Operation | TypeBox | Zod | Ratio |
|-----------|---------|-----|-------|
| Schema compilation | ~0.3ms | ~2.1ms | 7× faster |
| Object validation | ~0.02ms | ~0.15ms | 7-8× faster |
| Array (1000 items) | ~1.2ms | ~12ms | 10× faster |

*Benchmarks from [moltar/typescript-runtime-type-benchmarks](https://github.com/moltar/typescript-runtime-type-benchmarks)*

**Signal K implication**: For high-frequency delta validation (hundreds of NMEA 2000 messages per second), this headroom matters. TypeBox's native compiler generates validation rules that can be compiled once at client startup and reused efficiently.

### Cross-Language and WASM Support

Signal K's future includes WASM plugins and potentially other language bindings. TypeBox's native JSON Schema output means:

- WASM modules can consume JSON Schema directly
- Any future language bindings get first-class schema support
- Round-trip fidelity is guaranteed
- No conversion step that could introduce subtle differences

### Client-Side Reuse

TypeBox schemas can be directly consumed by client applications:

- TypeScript types via `Static<typeof Schema>` — IDE autocomplete and type checking
- Runtime validation via TypeBox compiler — validate incoming deltas
- Form validation — Angular, React form libraries can use TypeBox
- Same schemas on server and client — single source of truth extends to clients

This is a significant advantage over Zod for Signal K's use case.

### AsyncAPI Compatibility

AsyncAPI uses JSON Schema for message payloads. TypeBox schemas can be used directly without conversion, simplifying the toolchain for WebSocket protocol documentation.

### Summary Comparison

| Dimension | Zod | TypeBox | Signal K Winner |
|-----------|-----|---------|-----------------|
| JSON Schema fidelity | Good (converted) | Excellent (native) | **TypeBox** |
| JSON Schema features | Partial | Full | **TypeBox** |
| Validation performance | Good | Excellent | **TypeBox** |
| Pattern properties | Not supported | Native | **TypeBox** |
| AsyncAPI compatibility | Needs conversion | Native | **TypeBox** |
| WASM/cross-language | Good | Excellent | **TypeBox** |
| Client-side reuse | Good | Excellent | **TypeBox** |
| Ecosystem size | Large | Medium | Zod |
| Error messages | Excellent | Good | Zod |

For Signal K's specific needs — WASM support, pattern-based paths, AsyncAPI integration, client-side validation — TypeBox is the clear choice.

## Architecture

### What Lives in the Server

```
signalk-server/
├── src/schemas/                    # TypeBox — THE source of truth
│   ├── paths/                      # Well-known paths + units
│   │   ├── navigation.ts
│   │   ├── environment.ts
│   │   ├── electrical.ts
│   │   └── propulsion.ts
│   ├── protocol/                   # WebSocket protocol messages
│   │   ├── delta.ts
│   │   ├── subscription.ts
│   │   └── hello.ts
│   ├── api/                        # REST API request/response (v2)
│   │   ├── course.ts
│   │   └── resources.ts
│   ├── units.ts                    # Unit registry
│   └── lookup.ts                   # Path lookup utilities
├── docs/
│   └── protocol/                   # Protocol conceptual documentation
│       ├── overview.md             # What is Signal K, data model concepts
│       ├── deltas.md               # Delta semantics, when/why
│       ├── subscriptions.md        # Subscription behavior, policies
│       ├── discovery.md            # Server discovery, mDNS
│       └── security.md             # Authentication, authorization
├── generated/                      # Build output
│   ├── openapi.yaml                # REST API spec
│   ├── asyncapi.yaml               # WebSocket protocol spec
│   └── json-schema/                # For WASM/other implementations
│       ├── delta.json
│       ├── paths.json
│       └── units.json
└── scripts/
    └── generate-specs.ts           # Build script
```

### Protocol Specification Home

The protocol specification — the conceptual "why" and "how" documentation — moves to `signalk-server/docs/protocol/`. This includes:

- **Overview**: What Signal K is, data model concepts, design philosophy
- **Deltas**: Delta message semantics, update behavior, sources
- **Subscriptions**: Subscription policies, periods, filtering
- **Discovery**: mDNS, server discovery endpoints
- **Security**: Authentication, authorization, access control

This prose documentation complements the machine-readable AsyncAPI spec. AsyncAPI defines the message *formats*; the prose explains the *behavior*.

### What Gets Generated

From the TypeBox source schemas, the build step generates:

| Output | Purpose | Consumers |
|--------|---------|-----------|
| OpenAPI spec | REST API documentation | Swagger UI (existing) |
| AsyncAPI spec | WebSocket protocol documentation | AsyncAPI UI (new) |
| JSON Schema files | Schema interchange format | WASM, other implementations |
| paths.json | Well-known paths registry | Tooling, UI components |
| units.json | Unit definitions and conversions | Display formatting |

### Single Source of Truth Flow

```
TypeBox Schema (source)
    ├── TypeScript types (compile-time) → Server + Clients
    ├── Runtime validation (server)
    ├── Runtime validation (clients via @signalk/schemas)
    ├── OpenAPI docs for REST APIs → Swagger UI (existing)
    ├── AsyncAPI docs for WebSocket → AsyncAPI UI (new)
    ├── JSON Schema for WASM/other implementations
    └── paths.json, units.json for tooling
```

When you change a TypeBox schema, everything updates automatically. No more manual synchronization.

## Client-Side Usage

A key benefit of TypeBox is that clients can consume the same schemas for type safety and runtime validation.

### Path Lookup and Discriminator

When a client receives a delta, it needs to find the correct schema for validation. The `path` field in delta values serves as the natural discriminator — no protocol changes needed.

The schema package exports lookup utilities:

```typescript
// Exact path lookup (O(1))
export const pathSchemas = {
  "navigation.speedOverGround": SpeedOverGroundSchema,
  "navigation.position": PositionSchema,
  "navigation.courseOverGroundTrue": CourseOverGroundTrueSchema,
  "environment.wind.speedApparent": WindSpeedApparentSchema,
  // ...
}

// Pattern-based lookup (for wildcards like electrical.batteries.*.voltage)
export const pathPatterns = [
  { 
    pattern: /^electrical\.batteries\.[^.]+\.voltage$/,
    schema: BatteryVoltageSchema 
  },
  { 
    pattern: /^electrical\.batteries\.[^.]+\.current$/,
    schema: BatteryCurrentSchema 
  },
  // ...
]

// Convenience function
export function getSchemaForPath(path: string): TSchema | undefined {
  return pathSchemas[path] 
    ?? pathPatterns.find(p => p.pattern.test(path))?.schema
}
```

### Client Validation Patterns

Clients can choose their validation strategy based on performance needs:

**Compile once at startup** (recommended for known paths):

```typescript
import { getSchemaForPath } from '@signalk/schemas'
import { TypeCompiler } from '@sinclair/typebox/compiler'

// At app startup, compile validators for paths you care about
const validators = {
  sog: TypeCompiler.Compile(getSchemaForPath('navigation.speedOverGround')!),
  position: TypeCompiler.Compile(getSchemaForPath('navigation.position')!),
}

// On delta received — very fast validation
if (validators.sog.Check(delta.value)) {
  // value is valid
}
```

**Dynamic lookup** (flexible, slightly slower):

```typescript
import { getSchemaForPath } from '@signalk/schemas'
import { TypeCompiler } from '@sinclair/typebox/compiler'

// Cache compiled validators as paths are encountered
const validatorCache = new Map()

function validateDeltaValue(path: string, value: unknown): boolean {
  let validator = validatorCache.get(path)
  if (!validator) {
    const schema = getSchemaForPath(path)
    if (!schema) return true // Unknown path, skip validation
    validator = TypeCompiler.Compile(schema)
    validatorCache.set(path, validator)
  }
  return validator.Check(value)
}
```

### TypeScript Types for Clients

Clients get full TypeScript support:

```typescript
import { 
  type Position, 
  type SpeedOverGround,
  type Delta 
} from '@signalk/schemas'

// IDE autocomplete, type checking
function handlePosition(pos: Position) {
  console.log(pos.latitude, pos.longitude)  // typed as number
}

// Type-safe delta handling
function processDelta(delta: Delta) {
  for (const update of delta.updates) {
    for (const { path, value } of update.values) {
      if (path === 'navigation.position') {
        handlePosition(value as Position)
      }
    }
  }
}
```

### Form Validation

TypeBox integrates with form libraries:

```typescript
// Angular reactive forms
import { getSchemaForPath } from '@signalk/schemas'
import { TypeCompiler } from '@sinclair/typebox/compiler'

const positionValidator = TypeCompiler.Compile(getSchemaForPath('navigation.position')!)

// Custom validator
function signalkValidator(path: string) {
  const validator = TypeCompiler.Compile(getSchemaForPath(path)!)
  return (control: AbstractControl) => {
    return validator.Check(control.value) ? null : { signalk: true }
  }
}
```

## OpenAPI and AsyncAPI: Complementary, Not Competing

These serve different purposes and both are needed:

| Spec | Protocol | Purpose | UI |
|------|----------|---------|-----|
| **OpenAPI** | REST APIs | Documents v2 granular HTTP endpoints | Swagger UI (keep existing) |
| **AsyncAPI** | WebSocket | Documents streaming protocol (deltas, subscriptions) | AsyncAPI UI (add new) |

In the admin interface, you'd have two navigation items:
- **REST API** → Swagger UI (OpenAPI) — existing, unchanged
- **WebSocket API** → AsyncAPI UI — new addition

Both are generated from TypeBox schemas, ensuring consistency.

### Why AsyncAPI Matters

Signal K's WebSocket streaming protocol — arguably the *core* of Signal K — has no formal machine-readable documentation today. It's only described in prose.

AsyncAPI provides:
- Machine-readable protocol specification
- Interactive documentation (like Swagger UI, but for WebSockets)
- Code generation for clients
- Message validation

AsyncAPI is mature (v3.0) and used by Slack, Salesforce, SAP, and others. It is well established in the IoT world, making it a natural fit for Signal K.

## What Gets Eliminated

| Eliminated | Replaced By |
|------------|-------------|
| Specification repository | Archived with redirect |
| Hand-written JSON Schema | Generated from TypeBox |
| Hand-written OpenAPI JSON | Generated from TypeBox |
| Prose-only WebSocket docs | AsyncAPI (machine-readable) + prose in server repo |
| Scattered validation code | Unified TypeBox validation |
| Multiple sources of truth | Single source in server |
| v1 full model schema | Deprecated, v2 schemas in TypeBox |
| `@signalk/server-api` types | `@signalk/schemas` (types + validation) |

## Package Publishing

The `@signalk/schemas` package is published **from the server repo** — no separate repository. This maintains the single source of truth principle.

### Package Contents

The package serves two audiences:

| Audience | Consumes |
|----------|----------|
| TypeScript/JavaScript clients | TypeBox schemas directly (types + validation) |
| WASM / other languages | Generated JSON Schema files |

```
@signalk/schemas/
├── dist/                       # Compiled TypeScript → JavaScript
│   ├── paths/
│   │   ├── navigation.js
│   │   ├── environment.js
│   │   └── index.js
│   ├── protocol/
│   │   ├── delta.js
│   │   └── index.js
│   ├── api/
│   │   └── index.js
│   ├── lookup.js               # Path lookup utilities
│   └── index.js
├── types/                      # TypeScript declarations
│   └── *.d.ts
├── json-schema/                # Generated JSON Schema
│   ├── delta.json
│   ├── paths.json
│   └── units.json
├── openapi.json                # Generated OpenAPI spec
├── asyncapi.json               # Generated AsyncAPI spec
└── package.json
```

### Relationship to `@signalk/server-api`

The existing `@signalk/server-api` package provides manually-maintained TypeScript types. With `@signalk/schemas`:

- Types are generated from TypeBox (`Static<typeof Schema>`)
- Types are guaranteed to match actual validation
- Runtime validation is available, not just compile-time types

**Migration path**: `@signalk/server-api` will be deprecated. During transition, it can re-export from `@signalk/schemas` for backwards compatibility.

### Publishing Workflow

The server release workflow publishes both packages from the same repository:

1. `signalk-server` — the server itself
2. `@signalk/schemas` — schemas for clients and other implementations

Schema version stays in sync with server version automatically.

## What Other Implementations Consume

WASM plugins and any other Signal K implementations would consume:

- **`@signalk/schemas` npm package** — TypeBox schemas (JS/TS) or JSON Schema files
- **JSON Schema files** — Fetched from running server or package
- **AsyncAPI document** — Machine-readable protocol specification
- **paths.json / units.json** — Simple JSON for tooling

This is *better* than today. Currently other implementations parse prose documentation. With this approach they get machine-readable specs with guaranteed accuracy.

## Scope Boundaries

### In Scope

- Core well-known paths (navigation, environment, electrical, propulsion, etc.)
- Protocol message formats (delta, subscription, hello)
- REST API contracts (v2 APIs)
- Unit definitions and conversions
- Protocol conceptual documentation
- Path lookup utilities for client-side validation

### Out of Scope

- Third-party plugin path documentation (plugins self-document)
- v1 full model schema (deprecated)
- Full client SDK (future opportunity, see below)

## Documentation Hosting

### Current Infrastructure

- **demo.signalk.org** — Runs latest Docker container, always current
- **Current documentation** — Auto-published from repository

### Proposed Approach

Generated specs are served from demo.signalk.org, which already runs the latest server:

| Route | Content | Notes |
|-------|---------|-------|
| `/admin/openapi` | Swagger UI for REST APIs | Existing, now fed by generated spec |
| `/admin/asyncapi` | AsyncAPI UI for WebSocket | New addition |
| `/signalk/v2/api/specs/openapi.json` | Raw OpenAPI spec | For tooling |
| `/signalk/v2/api/specs/asyncapi.json` | Raw AsyncAPI spec | For tooling |
| `/signalk/v2/api/specs/paths.json` | Path registry | For tooling |

Since demo.signalk.org auto-updates with new Docker releases, documentation stays current automatically. No separate publishing step needed.

External links (signalk.org/specification) redirect to demo.signalk.org.

## Implementation Stages

### Stage 1: Add TypeBox Alongside Existing (Low Risk)

- Add TypeBox schemas to server for one API module (e.g., Course API)
- Generate OpenAPI from TypeBox
- Verify output matches existing hand-written OpenAPI
- No external changes — proof of concept only

### Stage 2: Expand and Switch

- Convert remaining v2 API modules to TypeBox
- Add path registry and protocol schemas
- Add path lookup utilities
- Switch Swagger UI to use generated OpenAPI
- Remove hand-written OpenAPI JSON files

### Stage 3: AsyncAPI Integration

- Create AsyncAPI document for WebSocket protocol
- Add AsyncAPI UI to admin interface
- Move protocol prose documentation to server repo (`docs/protocol/`)

### Stage 4: Package Publishing

- Set up `@signalk/schemas` package publishing from server repo
- Publish first version of schema package
- Deprecate `@signalk/server-api` with notice pointing to `@signalk/schemas`
- Update signalk.org links to point to demo.signalk.org
- Explicitly deprecate v1 full model schema

### Stage 5: Archive Specification Repository

- Add prominent deprecation notice to specification repo README
- Point all documentation links to server repo / demo.signalk.org
- Set repo to archived/read-only on GitHub
- Redirect any remaining signalk.org/specification URLs

### Effort Estimate

| Stage | Scope | Effort | Risk |
|-------|-------|--------|------|
| Stage 1 | One API module proof-of-concept | Small | Low |
| Stage 2 | All v2 API modules + path registry | Medium | Low |
| Stage 3 | AsyncAPI + protocol docs migration | Medium | Low |
| Stage 4 | Package publishing + deprecations | Small | Low |
| Stage 5 | Archive specification repo | Small | Low |

All stages can be done incrementally with no breaking changes.

## Future Opportunities

This proposal enables future work that is out of scope for now:

### Client SDK

With TypeBox schemas published, a type-safe client SDK becomes possible:

```typescript
// Future @signalk/client (not part of this proposal)
import { SignalKClient } from '@signalk/client'

const client = new SignalKClient('ws://localhost:3000/signalk/v1/stream')

// Type-safe, validated subscriptions
client.subscribe('navigation.speedOverGround', (value) => {
  // value is typed as number, already validated
  console.log(`Speed: ${value} m/s`)
})

// v2 API with full types
const destination = await client.api.course.getDestination()
// destination is typed, request/response validated
```

### Plugin Schema Registration

Plugins could register their custom paths with TypeBox schemas:

```typescript
// In a plugin
export const pluginPaths = {
  'environment.sunlight.intensity': Type.Number({ minimum: 0 })
}
```

The server could aggregate these for a complete runtime schema registry.

### Code Generation

AsyncAPI and OpenAPI specs enable code generation for clients in any language, further reducing the barrier to Signal K adoption.

## Benefits Summary

| Benefit | Who It Helps |
|---------|--------------|
| Easier path/unit additions | Maintainers |
| Runtime validation | Server reliability |
| Auto-generated REST docs | Plugin developers |
| Auto-generated WebSocket docs | Client developers |
| TypeScript types | TypeScript users |
| Client-side validation | Client developers |
| JSON Schema for WASM/other languages | Future implementations |
| Protocol spec has a home | Documentation consumers |
| Single source of truth | Everyone |
| Supports v2 migration | Strategic alignment |
| Deprecates `@signalk/server-api` complexity | Maintainers |

## What Doesn't Change

- Signal K protocol semantics
- Existing REST API contracts
- WebSocket delta format
- Plugin API compatibility
- Swagger UI (stays, fed by generated OpenAPI)

## Open Questions for Maintainers

### Schema Versioning

Should schemas be versioned independently of server releases?

| Option | Pros | Cons |
|--------|------|------|
| Tied to server version | Simple, clear | Schema change = server release |
| Independent semver | Flexibility | Complexity, coordination |

**Recommendation**: Tie to server version initially. Revisit if pain emerges.

### Governance

Who approves path additions? 

**Recommendation**: Same PR process as other server changes. Path additions are documentation, not code — lower bar than API changes.

### AsyncAPI UI Choice

Which AsyncAPI visualization tool?

| Option | Pros | Cons |
|--------|------|------|
| AsyncAPI Studio | Full-featured, official | Heavier |
| AsyncAPI React component | Lightweight, embeddable | Less features |

**Recommendation**: Start with AsyncAPI React component for consistency with existing admin UI.

### Pre-compiled Validators

Should `@signalk/schemas` ship pre-compiled validators for common paths?

| Option | Pros | Cons |
|--------|------|------|
| Compile on demand only | Smaller package, flexible | Startup cost for clients |
| Ship pre-compiled | Zero startup cost | Larger package |
| Both (optional import) | Best of both | Slight complexity |

**Recommendation**: Start with compile-on-demand. Add pre-compiled as optional import if there's demand.

## References

- TypeBox: https://github.com/sinclairzx81/typebox
- AsyncAPI: https://www.asyncapi.com/
- TypeBox benchmarks: https://github.com/moltar/typescript-runtime-type-benchmarks
- Current server OpenAPI: `signalk-server/src/api/*/openApi.json`
- Current specification repo: `github.com/SignalK/specification`
- demo.signalk.org: https://demo.signalk.org

---

*Prepared for Signal K maintainer discussion*
*January 2025*