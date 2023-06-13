## TreeSelect
Mendix widget to use [AntDesign TreeSelect](https://ant.design/components/tree-select). The widget is designed to display a list of objects that have a self-association or do raw JSON input and output.  
![Demo image](https://github.com/bsgriggs/mendix-tree-select/blob/media/DemoImage.png)  

## Features
- Search the data set
- Data source can be Mendix Objects or raw JSON
- Can show the options as checkboxes or cells
- Option to use tree lines
- Option to have all context expanded or collapsed by default
- Select a reference or reference set

## Usage
<details>
<summary><h3>1. Add this widget to the Mendix Project</h3></summary>

1. Download the mpk file from [here](https://github.com/bsgriggs/mendix-tree-select/releases).
3. Copy the mpk file to your Mendix Project directory `{YourMendixProjectFolder}/widgets/`.
4. Open your Mendix Project with Mendix Studio Pro and click on the menu `Menu > App > Synchronize App Directory`.
 
</details>
<details>
<summary><h3>2. Domain model properties</h3></summary>

Your module must include an attribute that uniquely defines an object. For me, this is the ItemNo AutoNumber.  
![Domain](https://github.com/bsgriggs/mendix-tree-select/blob/media/Domain.png)  
*Note:*
- The "Item" entity will be displayed in the dropdown
- The "ItemSelection" entity is the owner of the association that is set when option(s) are selected
- If you are using Input Type "JSON", you will need 2 non-persistent entities to store the state of the widget and manage the selected objects

</details>
<details>
<summary><h3>3. General properties of the widget</h3></summary>
 
 ![Customization](https://github.com/bsgriggs/mendix-tree-select/blob/media/Customization.png)  
*Note: Checkable is only allowed if Reference Type = Reference Set*
![Selectable Objects Common](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjects_Common.png)  
**Input Type** - How the widget expects to receive the selectable objects and how the widget sets the selected value. Detailed setup for both types below.  
**Selection Type** - Determines which items get returned if a parent and all of its children are selected
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
 
</details>
<details>
<summary><h3>4a. Input Type "Mendix"</h3></summary>
 
 The widget will generate the widget's structure using the selected data source. 
![Mendix Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectMendix.png)  
*Note:* 
- Parent key must be the SAME attribute as the key but navigates across the self-association. It is used to match each child with by its parent's key
- If the parent key for an object is empty or is not found, the widget will display that record as a root option
- Association is the reference set on the page object that get set when the user selects an option
- Large data sets can run into performance issues while converting the data, consider using JSON mode
 
</details>
<details>
<summary><h3>4b. Input Type "JSON"</h3></summary>
 
 ![JSON Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjectJSON.png)  
**Tree data type** - Controls which JSON structure the widget expects.  
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
 
 1. Create a JSON Structure using the JSON Snippets above. If your unique identifier is a string, change the integers in the structures below to also be a string.  
 2. Create a JSON Structure with the following. If your unique identifier is a string, encase the 1 with quotation marks.  
```json
[1]
```
3. Use the JSON Structure from #2 to create the following Import and Export Mappings. "Value" should be your entity's unique identifier ... in my case ItemNo.  
<table>
 <tr>
  <td>Import</td>
  <td>Export</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Import_Selection.png"  alt="Import selection" width="100%" height="auto" ></td>
 <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Selection.png"  alt="Export selection" width="100%" height="auto" ></td>
</table>

4. Wrap the widget with a data view
![Sample page](https://github.com/bsgriggs/mendix-tree-select/blob/media/SamplePage.png)  
5. The data view returns the TreeSelectHelper from the domain model above.  
![DS_TreeSelectHelper](https://github.com/bsgriggs/mendix-tree-select/blob/media/DS_TreeSelectHelper.png)  
5a. The first export should be use the Export Mapping from #3.  
5b. For Tree Data Type "Flat", retrieve all the objects you want displayed. For Tree Data Type "Tree", ONLY retrieve the root level objects. Children will be retrieved by the subsequent export mapping.  
5c. Use an export mapping to get the JSON structure for your selectable objects. These should be based on the JSON structures in the Tree Data Type section above.   
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

6. Add an on change microflow that converts the JSON stored on the "selected attribute" back to Mendix objects.  
![on change](https://github.com/bsgriggs/mendix-tree-select/blob/media/ACT_ItemSelect_OnChange.png)  
6a. Use an Import mapping using the JSON snippet in #3 and import from $TreeSelectHelper/Selected.  
6b. Iterate that list and retrieve the original objects by their unique identifier attribute.  
6c. Change the page object's reference set to the list retrieve by the loop.  
 
</details>

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
