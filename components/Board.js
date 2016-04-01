var React = require('react');
var Display = require('./parts/Display');
var BarChart = require('react-d3').BarChart;

var Board = React.createClass({

  barGraphData(results) {
    console.log(results);
      var data = Object.keys(results).map(function(choice) {
          return {
            label: choice,
            value: results[choice]
          }
      });
      console.log(data);
      return data;
  },

  render() {
      var barData = [
  {label: 'A', value: 5},
  {label: 'B', value: 6},
  {label: 'F', value: 7}
];
       return (
           <div id="scoreboard">
           		<Display if={this.props.status === 'connected' && this.props.currentQuestion}>
               <h3>{this.props.currentQuestion.q}</h3>
               <p>{JSON.stringify(this.props.results)}</p>
                <BarChart data={barData} 
                  title='Hello'
                    width={500}
                  height={200}
                  fill={'#3182bd'} />
           		</Display>

       			<Display if={this.props.status === 'connected' &&  !this.props.currentQuestion}>
       				<h3>Awaiting question</h3>
       			</Display>
           </div>
       )
   } 
});

module.exports = Board;