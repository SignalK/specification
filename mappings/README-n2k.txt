The n2kMappings.json file contains mappings from well known pgns to signalk keys.

The input is assumed to be the CanBoat json format, eg

	{
	    "timestamp": "2013-10-08-16:04:06.044",
	    "prio": "3",
	    "src": "1",
	    "dst": "255",
	    "pgn": "126992",
	    "description": "System Time",
	    "fields": {
	        "SID": "222",
	        "Date": "2013.10.08",
	        "Time": "16:04:00"
	    }
	}
	
The mapping consists of a list of pgns, each with an array of matched elements:

	{
	    "126992": [
	        {
	            "source": "Date",
	            "node": "environment.date.value"
	        },
	        {
	            "source": "Time",
	            "node": "environment.time.value"
	        }
	    ],
	    "128267": [
	        {
	            "source": "Depth",
	            "node": "environment.depth.belowTransducer.value"
	        }
	    ],
	   etc...

Each element has two mandatory keys:
	source = the json key in the fields array that holds the required value, eg "Date" above
	node = the signalk node to which we save the value.
	
Optional keys are:
	filter = a jsonPath expression which must be true for the source to map to the node. This allows us to differentiate on flags such as true vs magnetic.
	type = generally the data type is obvious and can be derived easily from the content, however sometimes a hint is required (eg mmsi is a string, but contains only numbers).
	factor = a numeric decimal value. The pgn value should be multiplied by this to convert to signalk SI units. *Not used yet*
	
	eg
	"129038": [
    	{
            "source": "User ID",
            "node": "mmsi",
            "type": "string"            
        },
	 "130306": [
        {
            "source": "Wind Speed",
            "node": "environment.wind.speedApparent.value",
            "filter": "$.fields[?(@.Reference=='Apparent')]"
        },
        {
            "source": "Wind Speed",
            "node": "environment.wind.speedTrue.value",
            "filter":"$.fields[?(@.Reference=='True (boat referenced)')]"
        },
        etc...