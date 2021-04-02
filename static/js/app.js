// app.js

var dropdown=d3.select('#selDataset')
dropdown.on("change",updatePlotly);
function init() {
    var table_body=d3.select("tbody");
    d3.json("././samples.json").then((data)=> {
        var dropdown=d3.select('#selDataset');
        var all_data=data;
        var names=all_data['names'];
        names.forEach(nameid=> {
            dropdown.append('option').text(nameid).property('value',nameid)});
        var name_id=dropdown.property('value');
        var metadata=all_data['metadata'];
        var samples=all_data['samples'];
        var current_sample=samples.filter(sample=>sample.id==name_id.toString())
        var otu_ids=current_sample[0]['otu_ids'];
        var sample_values=current_sample[0]['sample_values'];
        var hover_text=current_sample[0]['otu_labels'];
        var otu='OTU';
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
            xaxis:{title:{text:'OTU ID'}}            
        };
        //populate the bar chart
        var traces=[trace];
        Plotly.newPlot('bar', traces);
        
        //populate the demographic table
        var current_metadata=metadata.filter(meta=>meta.id==name_id);
        Object.entries(current_metadata[0]).forEach(([key,value])=>{
            row=table_body.append('tr');
            row.append('td').text(key.concat(":",value));
        });
        
        //populate the bubble chart
        var tracers=[tracer];
        Plotly.newPlot('bubble',tracers, bubble_layout);

        //populate the gauge
        var wfreq = current_metadata[0]['wfreq'];
        var gauge_trace = [{
            domain: {x:[0,1],y:[0,1]},
            value: wfreq,
            title:{text:"Belly Button Washing Frequency: Scrubs per week"},
            type:"indicator",
            textposition: "inside",
            mode: "gauge+number",
            //delta:{reference:10},
            gauge:{
                axis:{range:[0,9]},
                steps: [{range:[0,1], color:"white"},
                        {range:[1,2], color:"lightgray"},
                        {range:[2,3], color:"lightyellow"},
                        {range:[3,4], color:"yellow"},
                        {range:[4,5], color:"gold"},
                        {range:[5,6], color:"lightgreen"},
                        {range:[6,7], color:"green"},
                        {range:[7,8], color:"darkgreen"},
                        {range:[8,9], color:"blue"},]
            }
        }];
        var gauge_layout = {width: 550, height: 500, margin:{t:0,b:0}};
        Plotly.newPlot("gauge", gauge_trace, gauge_layout);
        console.log(wfreq);
    });

};
init();

function updatePlotly() {
    var table_body=d3.select("tbody");
    table_body.text("");
    d3.json("././samples.json").then((data)=> {
        var dropdown=d3.select('#selDataset');
        var all_data=data;
        var name_id=dropdown.property('value');
        var metadata=all_data['metadata'];
        var samples=all_data['samples'];
        var current_sample=samples.filter(sample=>sample.id==name_id.toString());
        var current_metadata=metadata.filter(meta=>meta.id==name_id);
        var wfreq = current_metadata[0]['wfreq'];
        var otu_ids=current_sample[0]['otu_ids'];
        var sample_values=current_sample[0]['sample_values'];
        var otu_id_labels=otu_ids.map((one_id)=>'OTU'.concat(' ',one_id));
        Plotly.restyle('bar', 'x',[sample_values.slice(0,10).reverse()]);
        Plotly.restyle('bar', 'y',[otu_id_labels.slice(0,10).reverse()]);
        Plotly.restyle('bubble', 'x',[otu_ids]);
        Plotly.restyle('bubble', 'y',[sample_values]);
        Plotly.restyle('gauge', 'value',[wfreq]);

        var current_metadata=metadata.filter(meta=>meta.id==name_id);
        Object.entries(current_metadata[0]).forEach(([key,value])=>{
            row=table_body.append('tr');
            row.append('td').text(key.concat(":",value));
        });
    });
};