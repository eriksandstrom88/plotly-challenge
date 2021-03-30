// app.js

// {"names": [list of "940-1601"],
// "metadata": [{"id": 940, 
//             "ethnicity": "Caucasian", 
//             "gender": "F", 
//             "age": 24.0, 
//             "location": "Beaufort/NC", 
//             "bbtype": "I", 
//             "wfreq": 2.0}],
// "samples": [{"id":"940", 
//             "otu_ids":[1167, buncyh of numbers],
//             "sample_values":[163,126,bunch of numbers],
//             "otu_labels":[Bacteria, Bacteroidetes, bunch of names]},
//             {"id".............}
//             ]
// }
var table_body=d3.select("tbody");
d3.json("././samples.json").then((data)=> {
    // console.log(data);
    var all_data=data;
    var names=data['names'];
    var metadata=data['metadata'];
    var samples=data['samples'].slice(0,5);
    var otu_ids=samples[0]['otu_ids'];
    var sample_values=samples[0]['sample_values'];
    var hover_text=samples[0]['otu_labels'];
    var otu='OTU'
    var otu_id_labels=otu_ids.map((one_id)=>otu.concat(' ',one_id));
    var trace={
        'type':'bar',
        'y':otu_id_labels.slice(0,10).reverse(),
        'x':sample_values.slice(0,10).reverse(),
        text:hover_text.slice(0,10).reverse(),
        orientation: 'h'
    };
    var tracer={
        'type':'scatter',
        'x':otu_ids,
        'y':sample_values,
        mode:'markers',
        text:hover_text,
        marker:{
            size:sample_values,
            color:otu_ids
        }
    };
    var bubble_layout={
        xaxis:{title:{text:'OTU ID'}//,
        // rangeselector:selectorOptions,
        // rangeslider:{}
        }
        
    };
    //populate the bar chart
    var traces=[trace];
    Plotly.newPlot('bar', traces);
    //populate the demographic table
    var first_metadata=metadata[0]
    Object.entries(first_metadata).forEach(([key,value])=>{
        row=table_body.append('tr');
        row.append('td').text(key.concat(":",value));
    });
    //populate the bubble chart
    var tracers=[tracer];
    Plotly.newPlot('bubble',tracers, bubble_layout);
});



// 0. Create the visual elements
// 1. populate the visuals with data from one sample 
// 2. Format anything that needs to be formatted - bootstrap/html, hover Text, visual styles 
// 3. place an event listener on the dropdown and tell it what action to take 
// 4. 
// var samples_file = 