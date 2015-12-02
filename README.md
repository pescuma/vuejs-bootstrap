# vuejs-bootstrap
Bootstrap based components for vuejs.

To use them, you need to include bootstrap files by yourself, for ex:

```html
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
```

## Components

### b-row

A row div.

```html
<row>
  ...
</row>
```

### b-tabs / b-tab

Tabs.

```html
<tabs>
  <tab title="A title">
    ...
  </tab>
  <tab title="Some different title">
    ...
  </tab>
</row>
```


### b-select2

A combo based on select2.

```html
<b-select2 label="A name" colspan="4" multiple allow-clear empty-text="All" 
           :options="authors" :render="formatFunc" :model.sync="myVar"></b-select2>
```

Depends on select2 files being included. For example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-css/1.4.6/select2-bootstrap.min.css">
```


### b-grid

A table, with sorting and paging and multiple headers.

```html
<b-grid colspan="12" page-size="10" bordered="true" striped="true" hover="true" condensed="true" 
        :model="myVar" :order-by="1">
	<b-column header="Language" width="20%" :render="renderFunc" order="name"></b-column>
	<b-column :header="['Lines', 'Total']" render="lines.total"></b-column>
	<b-column :header="['Lines', '%']" render="lines.percent"></b-column>
	<b-column :header="['Lines', 'Code']" render="lines.code"></b-column>
	<b-column :header="['Lines', 'Comment']" render="lines.comment"></b-column>
	<b-column :header="['Lines', 'Empty']" render="lines.empty"></b-column>
	<b-column header="Files" render="files"></b-column>
	<b-column :header="['Commits', 'Total']" render="commits.total"></b-column>
	<b-column :header="['Commits', 'First']" render="commits.start"></b-column>
	<b-column :header="['Commits', 'Last']" render="commits.end"></b-column>
	<b-column header="Authors" render="authors"></b-column>
</b-grid>
```


### b-datatable

A table, with sorting and paging and multiple headers, based on datatable.

```html
<b-datatable colspan="12" :model="myVar">
	<b-column header="Language" width="20%" :render="renderFunc" order="name"></b-column>
	<b-column :header="['Lines', 'Total']" render="lines.total"></b-column>
	<b-column :header="['Lines', '%']" render="lines.percent"></b-column>
	<b-column :header="['Lines', 'Code']" render="lines.code"></b-column>
	<b-column :header="['Lines', 'Comment']" render="lines.comment"></b-column>
	<b-column :header="['Lines', 'Empty']" render="lines.empty"></b-column>
	<b-column header="Files" render="files"></b-column>
	<b-column :header="['Commits', 'Total']" render="commits.total"></b-column>
	<b-column :header="['Commits', 'First']" render="commits.start"></b-column>
	<b-column :header="['Commits', 'Last']" render="commits.end"></b-column>
	<b-column header="Authors" render="authors"></b-column>
</b-datatable>
```

Depends on datatable files being included. For example:

```html
<script charset="utf8" src="https://cdn.datatables.net/1.10.6/js/jquery.dataTables.js"></script>
<script src="https://cdn.datatables.net/plug-ins/1.10.6/integration/bootstrap/3/dataTables.bootstrap.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/plug-ins/1.10.6/integration/bootstrap/3/dataTables.bootstrap.css">
```

## TODO

Lots of controls.

Build system.

Pusblish somewhere.
