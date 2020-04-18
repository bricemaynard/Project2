url_chart = "https://covidtracking.com/api/v1/states/daily.json"

    function getPlot(state) {
        
        d3.json(url_chart).then((data)=> {
            console.log(data)
    
            //var wash = data.metadata.map(d => d.wash)
            //console.log(`Washing Freq: ${wash}`)
            
            
            var states = data.states.filter(s => s.state.toString() == state)[0];
            
            console.log(states);
    
            
            var statevalues = states.positive.slice(0, 10).reverse();
    
            var positive_top = (states.positive.slice(0, 10)).reverse();
            
            var positive_state = positive_top.map(d => "Positive " + d)
    
            console.log(`Positive States: ${positive_state}`)
    
            var labels = states.states.slice(0, 10);
    
            console.log(`State Values: ${statevalues}`)
            console.log(`Id Values: ${positive_top}`)

            
            var trace = {
                x: samplevalues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'rgb(93, 164, 214)'},
                type:"bar",
                orientation: "h",
            };
    
            var data = [trace];
    
            
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            
            Plotly.newPlot("bar", data, layout);
    
            console.log(`ID: ${samples.otu_ids}`)
        
            var trace1 = {
                x: samples.otu_ids,
                y: samples.sample_values,
                mode: "markers",
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids
                },
                text: samples.otu_labels
    
            };
    
            
            var layout_b = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            var data1 = [trace1];
    
            
            Plotly.newPlot("bubble", data1, layout_b); 

        });
    }
    
    
    function getInfo(id) {
        
        d3.json("data/samples.json").then((data)=> {
            
            
            var metadata = data.metadata;
    
            console.log(metadata)
    
            
            var result = metadata.filter(meta => meta.id.toString() == id)[0];
    
            var demographicInfo = d3.select("#sample-metadata");
            
            
            demographicInfo.html("");
    
            
            Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    
    
    function optionChanged(id) {
        getPlot(id);
        getInfo(id);
    }
    
    
    function init() {
        
        var dropdown = d3.select("#selDataset");
    
        d3.json("data/samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            getPlot(data.names[0]);
            getInfo(data.names[0]);
        });
    }
    
    init();