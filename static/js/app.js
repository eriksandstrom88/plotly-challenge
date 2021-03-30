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

d3.json("././samples.json").then((data)=> {
    // console.log(data);
    var all_data=data;
    var names=data['names'];
    var metadata=data['metadata'];
    var samples=data['samples'].slice(0,5);//.map((one_sample)=>one_sample);
    var otu_ids=samples[0]['otu_ids'];
    var sample_values=samples[0]['sample_values'];
    // var sample_values=samples
    // console.log(otu_ids)
    var trace={
        'type':'bar',
        'y':otu_ids.slice(0,10),
        'x':sample_values.slice(0,10),
        orientation: 'h'
    };
    var traces=[trace];
    Plotly.newPlot('bar', traces);
    // 
    
});



// 0. Create the visual elements
// 1. populate the visuals with data from one sample 
// 2. Format anything that needs to be formatted - bootstrap/html, hover Text, visual styles 
// 3. place an event listener on the dropdown and tell it what action to take 
// 4. 
// var samples_file = 