## TreeSelect
Mendix widget to use [AntDesign TreeSelect](https://ant.design/components/tree-select). The widget is designed to display a list of objects that have a self-association or do raw JSON input and output.

![Ant Design Icon](https://github.com/bsgriggs/mendix-tree-select/blob/media/AntDesignIcon.png) 

## Features
- Search the data set
- Data source can be Mendix Objects or raw JSON
- Can show the options as checkboxes or cells
- Option to use tree lines
- Option to have all context expanded or collapsed by default

## Usage  
### Domain Model  
The following domain model is an just an example. However, your module must include an attribute that uniquely defines an object. For me, this is the ItemNo AutoNumber.
![Domain](https://github.com/bsgriggs/mendix-tree-select/blob/media/Domain.png)  
*Notes:*
- The "Item" entity will be displayed in the dropdown
- The "ItemSelection" entity is the entity that holds the association that is set when option(s) are selected.
- If you are using Input Type "JSON", you will need 2 non-persistent entities to store the state of the widget and manage the selected objects.
 
### General Settings  
![Customization](https://github.com/bsgriggs/mendix-tree-select/blob/media/Customization.png)  

### Input Type: Mendix  
![Mendix Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectsMendix.png)  


### Input Type: JSON  
![JSON Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectsJSON.png)  


## Demo project
https://demo-antdwidgets100-accp.apps.ap-2a.mendixcloud.com/p/treeselect

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-tree-select/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v8, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[AntDesign TreeSelect](https://ant.design/components/tree-select)
