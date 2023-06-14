## Mendix Antd Tree Select
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

1. Download the mpk file from [GitHub](https://github.com/bsgriggs/mendix-tree-select/releases) or the Mendix Marketplace.
2. Copy the mpk file to your Mendix Project directory `{YourMendixProjectFolder}/widgets/`.
3. Open your Mendix Project with Mendix Studio Pro and click on the menu `Menu > App > Synchronize App Directory`.
 
</details>
<details>
<summary><h3>2. Domain model properties</h3></summary>

The entity you want to display must include an attribute that uniquely identifies an object. For me, this is the ItemNo AutoNumber.  
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
**Reference type** - Should the user be able to select a list of options of only one option?  
**Selection Type** - Determines which items get returned if a parent and all of its children are selected (Only for reference sets)  
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
<summary><h3>3a. Input Type "Mendix"</h3></summary>
 
 The widget will generate the widget's structure using the selected data source. 
![Mendix Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjects_Mendix.png)  
*Note:* 
- Parent key must be the SAME attribute as the key but navigates across the self-association. It is used to match each child with by its parent's key
- If the parent key for an object is empty or is not found, the widget will display that record as a root option
- Association is the reference set on the page object that get set when the user selects an option
- Large data sets can run into performance issues while converting the data, consider using JSON mode
 
</details>
<details>
<summary><h3>3b. Input Type "JSON"</h3></summary>
 
![JSON Selectable Objects](https://github.com/bsgriggs/mendix-tree-select/blob/media/SelectableObjects_JSON.png)  
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
 2. Wrap the widget with a data view.  
![Sample page](https://github.com/bsgriggs/mendix-tree-select/blob/media/SamplePage.png)  
 The functionality of DS_TreeSelectHelper and the On Change action depends on the reference type: reference or reference set:
 
 <details>
<summary><h3>JSON Reference</h3></summary>
  
  3. DS_TreeSelectHelper returns the TreeSelectHelper from the domain model above.  
![DS_TreeSelectHelper](https://github.com/bsgriggs/mendix-tree-select/blob/media/DS_TreeSelectHelper_Ref.png)  
  3a. Retrieve across the reference you're going to set to see if there is already a value. **If there is no current value, be sure to set $TreeSelectHelper/Selected as *empty*. Setting '' does not work.**  
  3b. For Tree Data Type "Flat", retrieve all the objects you want displayed. For Tree Data Type "Tree", ONLY retrieve the root level objects. Children will be retrieved by the subsequent export mapping.  
  3c. Use an export mapping to get the JSON structure for your selectable objects. These should be based on the JSON structures in the Tree Data Type section above.   
<table>
 <tr>
  <td>Flat</td>
  <td>Tree</td>
 </tr>
  <td> 
   <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Flat.png"  alt="Export flat" width="100%" height="auto" >
   <p>Label - the text shown for the option</p>
   <p>Value & Id & PId - should all be the SAME unique identifier for the object</p>
   <p>PId must have a conversion Microflow get the parent's unique identifier. Example: </p>
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
  
4. Add an on change microflow that converts the JSON stored on the "selected attribute" back to Mendix objects.  
![on change](https://github.com/bsgriggs/mendix-tree-select/blob/media/ACT_ItemSelection_OnChange_Ref.png)  
4a. If trim($TreeSelectHelper/Selected) != '', then retrieve the original object by the unique identifier on $TreeSelectHelper/Selected.  
4b. Otherwise, set the association as empty.  
  
</details>
 
  <details>
<summary><h3>JSON Reference Set</h3></summary>
   
3. DS_TreeSelectHelper returns the TreeSelectHelper from the domain model above.  
![DS_TreeSelectHelper](https://github.com/bsgriggs/mendix-tree-select/blob/media/DS_TreeSelectHelper_RefSet.png)  
3a. Retrieve across the reference you're going to set to see if there is already a value. Export that list by creating a JSON Structure with the following. If your unique identifier is a string, encase the 1 with quotation marks.  
```json
[1]
```
Then, use that JSON Structure to create the following Import and Export Mappings. "Value" should be your entity's unique identifier ... in my case ItemNo.  
<table>
 <tr>
  <td>Import</td>
  <td>Export</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Import_Selection.png"  alt="Import selection" width="100%" height="auto" ></td>
 <td> <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Selection.png"  alt="Export selection" width="100%" height="auto" ></td>
</table>
   
3b. For Tree Data Type "Flat", retrieve all the objects you want displayed. For Tree Data Type "Tree", ONLY retrieve the root level objects. Children will be retrieved by the subsequent export mapping.  
3c. Use an export mapping to get the JSON structure for your selectable objects. These should be based on the JSON structures in the Tree Data Type section above.   
<table>
 <tr>
  <td>Flat</td>
  <td>Tree</td>
 </tr>
  <td> 
   <img src="https://github.com/bsgriggs/mendix-tree-select/blob/media/Export_Flat.png"  alt="Export flat" width="100%" height="auto" >
   <p>Label - the text shown for the option</p>
   <p>Value & Id & PId - should all be the SAME unique identifier for the object</p>
   <p>PId must have a conversion Microflow get the parent's unique identifier. Example: </p>
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
   
4. Add an on change microflow that converts the JSON stored on the "selected attribute" back to Mendix objects.  
![on change](https://github.com/bsgriggs/mendix-tree-select/blob/media/ACT_ItemSelection_OnChange_RefSet.png)  
4a. Use the Import mapping from #3a and import from $TreeSelectHelper/Selected.  
4b. Iterate that list and retrieve the original objects by their unique identifier attribute.  
4c. Change the page object's reference set to the list retrieve by the loop.  
   
</details>
 
</details>

## Demo project
https://demo-antdwidgets100-accp.apps.ap-2a.mendixcloud.com/p/tree-select

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-tree-select/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v8, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[AntDesign TreeSelect](https://ant.design/components/tree-select)

Benjamin Griggs
Jonathan Schmitt
