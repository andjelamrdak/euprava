import React from "react";
import { Table } from "rsuite";

function TableWrap({ data, actions, columns, onRowClick }) {

  return (
    <Table onRowClick={onRowClick} height={400} affixHeader affixHorizontalScrollbar data={data}>
      {columns?.map((field) => (
        <Table.Column width={200} fixed={field.fixed} align="left">
          <Table.HeaderCell>{field?.header}</Table.HeaderCell>
          <Table.Cell>{(data) => field.render(data)}</Table.Cell>
        </Table.Column>
      ))}

      <Table.Column width={420} fixed="right">
        <Table.HeaderCell>Action</Table.HeaderCell>

        <Table.Cell>
          {(rowData) => {
            return actions?.map((action) => (
              <a
                className="linksInTable"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  action?.onclick(rowData);
                }}>
                {action?.render()}
              </a>
            ));
          }}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
}

export default TableWrap;
