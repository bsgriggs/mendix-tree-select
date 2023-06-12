## TreeSelect
Mendix widget to use [AntDesign TreeSelect](https://ant.design/components/tree-select). The widget is designed to display a list of objects that have a self-association or do raw JSON input and output.  
![All](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectionType_All.png)  

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
![Selectable Objects Common](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjects_Common.png)  
**Input Type** - How the widget expects to receive the selectable objects and how the widget sets the selected value. Detailed setup for both types below. 
**Selection Type**
<table>
 <tr>
  <td>All</td>
  <td>Parent only</td>
  <td>Children only</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectionType_All.png"  alt="Selection Type All" width="100%" height="auto" ></td>
 <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectionType_Parent.png"  alt="Selection Type Parent" width="100%" height="auto" ></td>
 <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectionType_Children.png"  alt="Selection Type Children" width="100%" height="auto" ></td>
</table>

### Input Type: Mendix  
The widget will generate the widget's structure using the selected data source. Note: This can lead to performance issues with large data sets.  
![Mendix Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectMendix.png)  

### Input Type: JSON  
![JSON Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectJSON.png)  
**Tree data type** - Controls which JSON structure the widget expects. (Use these to create a JSON structure in Mendix). Any unique integers in the structures below can be changed to strings if your unique identifier is also a string.
<table>
<tr>
<td> Flat </td> <td> Tree </td>
</tr>
<tr>
<td>
 
```json
[
    {
        "label": "",
        "value": 0,
        "id": 0,
        "pId": 0
    }
]
```

</td>
<td>

```json
[
    {
        "label": "Node1",
        "value": 0,
        "children": [
            {
                "label": "Child Node1",
                "value": 0,
                "children": [
                    {
                        "label": "Grand Child Node1",
                        "value": 0
                    }
                ]
            }
        ]
    }
]
```
 
<p>Note: You can add as much depth as you need. Just add more children to the lowest level of the JSON structure</p>

</td>
</tr>
</table>

**Input Type JSON Example**

1. You will then need to create a JSON Structure with simply:
```json
[1]
```
2. Use that JSON Structure to create the following Import and Export Mappings. "Value" should be your entity's unique identifier ... in my case ItemNo.  
<table>
 <tr>
  <td>Import</td>
  <td>Export</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Import_Selection.png"  alt="Import selection" width="100%" height="auto" ></td>
 <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Selection.png"  alt="Export selection" width="100%" height="auto" ></td>
</table>

3. Wrap the widget with a data view
![Sample page](https://github.com/bsgriggs/mendix-tree-select/blob/media/SamplePage.png)  
4. The data view returns the TreeSelectHelper from the domain model above.  
![DS_TreeSelectHelper](https://github.com/bsgriggs/mendix-tree-select/blob/media/DS_TreeSelectHelper.png)  
4a. The first export should be use the Export Mapping from step 2.  
4b. If you're using Tree Data Type "Tree", the retrieve from database should ONLY return the root level objects. Children will be retrieved by the subsequent export mapping. For Tree Data Type "Flat", simply retrieve all the objects you want displayed.  
4c. Use an export mapping to get the JSON structure for your selectable objects. These should be based on the JSON structures in the Tree Data Type section above.   
<table>
 <tr>
  <td>Flat</td>
  <td>Tree</td>
 </tr>
  <td> 
   <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Flat.png"  alt="Export flat" width="100%" height="auto" >
   <p>Label - the text shown for the option</p>
   <p>Value & Id & PId - should all be the SAME unique identifier for the object</p>
   <p>PId must have a conversion Microflow get the parent's unique identifer. Example: </p>
   <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/MAP_Item_ParentID.png" alt="Get parent id" width="100%" height="auto" >
   <p></p>
 </td>
 <td> 
  <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Tree.png"  alt="Export tree" width="100%" height="auto" >
  <p>The first JsonObject should be Method: Parameter. All subsequent children should be Method: By Microflow to get the list of those children's children. Example: </p>
  <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/MAP_Item_Children.png" alt="Get children" width="100%" height="auto" >
  <p></p>
 </td>
</table>

5. Add an On change microflow to convert the JSON stored on the Selected attribute back to Mendix objects.  
![on change](https://github.com/bsgriggs/mendix-tree-select/blob/media/ACT_ItemSelect_OnChange.png)  
5a. Use an Import mapping using the JSON snippet in step 2.  
5b. Iterate that list and retrieve the original objects by their unique identifier.  
5c. Change the page object's reference set to the list retrieve by the loop.  

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
