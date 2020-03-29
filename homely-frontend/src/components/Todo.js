import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{ title: "Name", field: "title" }],
      data: [
        { title: "40 pushups" },
        { title: "2 leetcode hards" },
        { title: "call my bestfriend Fred" }
      ]
    }
  }

  render() {
    return (
      <MaterialTable
        title="my to-do list"
        columns={this.state.columns}
        data={this.props.todo_set}
        actions={[
          {
            icon: 'cloud-upload',
            tooltip: 'Upload Todo',
            onClick: (event, rowData) => {
              console.log(rowData.name)
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          search: false
        }}
        editable={{
          onRowAdd: newData => {
            new Promise(resolve => {
              console.log("onRowAdd");
              if(!this.props.addTodo(newData)) return;
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            })
          },
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    );
  }

}
