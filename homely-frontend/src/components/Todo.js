import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function Todo() {
  const [state, setState] = React.useState({
    columns: [{ title: "Name", field: "name" }],
    data: [
      { name: "40 pushups" },
      { name: "2 leetcode hards" },
      { name: "call my bestfriend Fred" }
    ]
  });

  return (
    <MaterialTable
      title="my to-do list"
      columns={state.columns}
      data={state.data}
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
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
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
              setState(prevState => {
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
