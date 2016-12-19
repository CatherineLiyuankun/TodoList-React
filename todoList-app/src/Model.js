// import React from 'react';

/*var Model = React.createClass({
	// generate a random id for new task 
  generateId: function() {
    return Math.floor(Math.random() * 9000) + 1000;
  },

  getIndexById: function (taskId, data) {
    for ( var index = 0; index < data.length; index++) {
        if (data[index].id === taskId)
            return index;
    }
  },
  render() {
    return (
      <div className="model">
      </div>
    );
  }
});
*/

var Model = {
	// generate a random id for new task 
  generateId: function() {
    return Math.floor(Math.random() * 9000) + 1000;
  },

  getIndexById: function (taskId, data) {
    for ( var index = 0; index < data.length; index++) {
        if (data[index].id === taskId)
            return index;
    }
  }
};

export default Model;

