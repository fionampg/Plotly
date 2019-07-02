//init function to execute on first load of index.html.
function init() {
  // Grab a reference to the dropdown select element
  console.log("in init section.")
  var selector = d3.select("#selDataset");
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];

    // buildCharts(firstSample);
    buildMetadata(firstSample);
    
    // Plot the updated pie chart
    Plotpie(firstSample);
  
    //Update the scatter plot for the new sample selected.
    Plotscatter(firstSample);
  });

  
  // Plotly.d3.json("/names",function(error,response){
  //   if(error) console.warn(error);
  //   var dropdown_select = Plotly.d3.select("#selDataset");
  //   /*dropdown_select.data(response)
  //                   .enter()
  //                   .append("option")
  //                   .attr("value",data)
  //                   .text(data)
  //   */
  //  for(var i=0;i<response.length;i++){
  //      dropdown_select.append("option").attr("value",response[i]).text(response[i]);
  //  }
  //  console.log("in /names ", response)
  //  console.log(response)
  //  optionChanged(response[0]);

    // Use the first sample from the list to build the initial plots
    // const firstSample = sampleNames[0];
    // buildMetadata(firstSample);
    // Plotpie(firstSample);
  // });
}

function buildMetadata(sample) {
  console.log("in buildMetadata:  ")
  console.log("sample:  " + sample)


    // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metadataurl = "/metadata/" + sample  
  // Use d3 to select the panel with id of `#sample-metadata`
  var metaldatapanel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
  metaldatapanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    d3.json(metadataurl).then(function(data){
      console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        metaldatapanel.append("h5").text(`${key}:${value}`);
      }
      )
    }
    )

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
//   var url="/metadata/"+sample;

//   console.log(url);
//   // Use d3 to select the panel with id of `#sample-metadata`
//   d3.json(url).then(function(response){
//     // if(error) {console.warn(error)};
//     console.log(response);
//     var metadata_Sample= d3.select("#sample-metadata");
//     // Remove old metadata
//     metadata_Sample.selectAll("p").remove();

//     for(var key in response){
//         if(response.hasOwnProperty(key)){
//             metadata_Sample.append("p").text(key + ":   " + response[key]);
//         }
//     }
//     console.log("Exiting  buildMetadata   ")
//     buildGauge(response.WFREQ);
// });

}  
    
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    
//function to build a pie chart based on 10 samples. 
function Plotpie(sample){
  console.log("starting of plot for Pie Chart");
      // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var urlcharts = "/samples/" + sample;
    d3.json(urlcharts).then(function (data) {

    var data = [{
      values: data.sample_values.slice(0,10),
      labels: data.otu_ids.slice(0.10),
      // hovertext: data.otu_labels(0,10),
      type: "pie",
    }]

    var layout = {
      showlegend: true,
    };

    Plotly.newPlot("pie", data,layout);
    
  }
    )
}


  // var descriptions=[];
  // // Plotly.d3.json("/otu",function(error,response){
  // //     descriptions= response;
  // // })
  // d3.json("/samples/" + sample).then(function(response){
  //   //   if(error) console.warn(error);
  //   console.log('Plot Pie Inside');
  //   console.log(response);
  //     var pielabels=response['otu_ids'].slice(0,11);
  //     var pievalues=response['sample_values'].slice(0,11);
  //     var piedescription=response['otu_labels'].slice(0,11);
  //   //   for(var i=0;i<10;i++){
  //   //       pielabels.push(response.otu_ids[i]);
  //   //       pievalues.push(response.sample_values[i]);
  //   //       piedescription.push(response.otu_labels[i]);
  //   //       }
  //     console.log("pielabels " + pielabels) ;
  //     console.log("pievalues " + pievalues) ;
  //     console.log("piedescription " + piedescription)   ; 
  //     var trace1 = { 
  //         values: pievalues,
  //         labels: pielabels,
  //         type:"pie",
  //         name:"Top 10 Samples",
  //         textinfo:"percent",
  //         text: piedescription,
  //         textposition: "inside",
  //         hoverinfo: 'label+value+text+percent'
  //     }
  //     var data=[trace1];
  //     var layout={
  //         title: "<b>Top 10 Samples: " + sample + "</b>"
  //       //   height: 450,
  //       //   //height: 400,
  //       //   width: 500,
  //       //   margin: {
  //       //       l: 10,
  //       //       r: 10,
  //       //       b: 5,
  //       //       t: 5,
  //       //       pad: 5
  //           // },
  //     }
  //     console.log("ready to plot pie chart")
  //     Plotly.newPlot("pie",data,layout);
  // })
// }

function Plotscatter(sample){
  console.log("Plotting Scatter Plot");
  var urlcharts = "/samples/" + sample;
  d3.json(urlcharts).then(function (data) {
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: data.otu_ids, 
      y: data.sample_values,
      mode: "markers",
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      showlegend: false,
      height: 600,
      width: 1500
    };
    Plotly.newPlot('bubble', trace1, layout);


  // var descriptions1=[];
  // Plotly.d3.json("/otu").then(function(error,response){
  //     descriptions= response;
  //})
  //     d3.json("/samples/"+sample).then(function(response){
  //     //if(error) console.warn(error);
  //     console.log("In plotscatter, logging response next")
  //     console.log(response)
  //     var scatter_description = response['otu_labels'];
  //     console.log("logging scatter_description list")
  //     console.log(scatter_description.slice(0,10))
  //     // var scatter_description=[];
  //     // for(var i=0;i<response[0].otu_ids.length;i++){
  //     //     scatter_description.push(descriptions[response[0].otu_ids[i]]);
  //     // }
  //     var trace1 = {
  //         x: response['otu_ids'],
  //         y: response['sample_values'],
  //         marker: {
  //             size: response['sample_values'],
  //             color: response['otu_ids'].map(d=>100+d*20),
  //             colorscale: "Earth"
  //         },
  //         type:"scatter",
  //         mode:"markers",
  //         text: scatter_description,
  //         hoverinfo: 'x+y+text',
  //     };
  //     console.log("trace1" + trace1)
  //     var data = [trace1];
  //     console.log(data)
  //     var layout = {
  //         xaxis:{title:"OTU ID",zeroline:true, hoverformat: '.2r'},
  //         yaxis:{title: "# of germs in Sample",zeroline:true, hoverformat: '.2r'},
  //         height: 500,
  //         width:1200,
  //         margin: {
  //             l: 100,
  //             r: 10,
  //             b: 70,
  //             t: 10,
  //             pad: 5
  //           },
  //         hovermode: 'closest',
  //     };
  //     console.log(layout)
  //     console.log("starting scatter plot/bubble chart")
  //     Plotly.newPlot("bubble",data,layout);
      
  // })
  }
  )
}
  

function optionChanged(newSample) {
  console.log("optionchanged detected and new sample selected")
  console.log("new sample: " + newSample )
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);

  // Plot the updated pie chart
  Plotpie(newSample);
  
  //Update the scatter plot for the new sample selected.
  Plotscatter(newSample);
}
  //Plot the updated gauge chart
  //Plotgauge(newSample);
  

// Initialize the dashboard
init();
