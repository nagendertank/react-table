import React from "react";
import shortid from "shortid";

import ReactTable from "../../../../lib";
import "../../../../react-table.css";

import dragTableHOC from "../../../../lib/hoc/dragTable";

const DraggableTable = dragTableHOC(ReactTable);

async function getData() {
  const result = await (await fetch("/au_500_tree.json")).json();
  // we are adding a unique ID to the data for tracking the selected records
  return result.map(item => {
    const _id = shortid.generate();
    return {
      _id,
      ...item
    };
  });
}

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    if (key === "_id") continue;
    columns.push({
      accessor: key,
      Header: key
    });
  }
  return columns;
}

export class ComponentTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      columns: null,
    };
  }
  componentDidMount() {
    getData().then(data => {
      const columns = getColumns(data);
      this.setState({ data, columns });
    });
  }
  
  render() {
   
    const { data, columns } = this.state;
  
    return (
      <div style={{ padding: "10px" }}>
        <h1>react-table - Drag Table</h1>
        {data ? (
           <DraggableTable
            ref={r => (this.draggableTable = r)}
            columns={columns}
            data = {data}
            defaultPageSize={10}
            className="-striped -highlight"
            onDragChange={data=>this.setState({data})}
          />
        ) : null}
      </div>
    );
  }
}

export default ComponentTest;
