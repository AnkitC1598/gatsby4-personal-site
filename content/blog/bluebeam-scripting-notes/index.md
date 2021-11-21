---
title: "Bluebeam Scripting Notes"
tags: ["bluebeam", "javascript"]
published: true
date: "2020-04-15"
---

# Scripting in Bluebeam Revu

- You need Bluebeam XTREME to write / edit scripts

# Markup properties

The below was copied from the [Bluebeam Script Reference 2018 PDF](https://support.bluebeam.com/wp-content/uploads/2019/08/Bluebeam-Script-Reference-2018.pdf):

There are commands that return and accept string dictionaries containing key/value
pairs of markup properties. The following keys are supported by those commands:

| property       | description                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | The type of markup such as square or polygon                                                                                                |
| `page`         | The page index that the markup occurs on                                                                                                    |
| `author`       | The author of the markup                                                                                                                    |
| `subject`      | The subject of the markup                                                                                                                   |
| `comment`      | The comment of the markup                                                                                                                   |
| `color`        | The color of the markup                                                                                                                     |
| `colorfill`    | The fill color of the markup                                                                                                                |
| `colortext`    | The text color of the markup                                                                                                                |
| `opacity`      | The opacity of the markup from 0 to 1                                                                                                       |
| `opacityfill`  | The fill opacity of the markup from 0 to 1                                                                                                  |
| `rotation`     | The rotation of the markup in degrees from 0 to 360                                                                                         |
| `parent`       | The markup id of the markup's parent. Needed to understand the parent/child relationship of grouped markups                                 |
| `grouped`      | Boolean value indicating if the markup is grouped                                                                                           |
| `status`       | The status of the markup, valid states are "Accepted", "Rejected", "Cancelled", "Completed", and "None"                                     |
| `checked`      | Boolean value indicating that the markup is checked or unchecked                                                                            |
| `locked`       | Boolean value indicating that the markup is locked or unlocked                                                                              |
| `datecreated`  | The creation date of the markup                                                                                                             |
| `datemodified` | The modified date of the markup                                                                                                             |
| `linewidth`    | The width of the line in points where 72 points equals 1 inch. For most                                                                     |
| `markups`      | he range is 0 to 12.                                                                                                                        |
| `linestyle`    | The style of the line, valid styles are "solid", "dashed1", "dashed2", "dashed3", "dashed4", "dashed5", "dashed6", "cloudy1", and "cloudy2" |
| `x`            | The x coordinate of the markup in points where 72 points equals 1 inch                                                                      |
| `y`            | The y coordinate of the markup in points where 72 points equals 1 inch                                                                      |
| `width`        | The width of the markup in points where 72 points equals 1 inch                                                                             |
| `height`       | The height of the markup in points where 72 points equals 1 inch                                                                            |
| `space`        | The space defined in the PDF that the markup resides in (read-only)                                                                         |
| `layer`        | The layer that the markup is assigned to (read-only)                                                                                        |
| `captureCount` | The number of capture images and video attached to the markup(read-only)                                                                    |

## Example

This following example will run a script named `myscript.bci`, which will open a PDF file,
import markups, flatten the markups, and then save and close the file.

`ScriptEngine.exe Script('myscript.bci')`

Where myscript.bci contains:

```js
    Open("c:\source.pdf")
    Import("c:\user.bax")
    Flatten()
    Save("c:\output.pdf")
    Close()
```

# Markdown Functions

The below functions can be used to interact with Markdown in a Bluebeam doc

1. `ColumnDataGet`
1. `ColumnDataSet`
1. `ColumnsExport`
1. `ColumnsImport`
1. `Export`
1. `Flatten`
1. `Import`
1. `MarkupCaptureExport`
1. `MarkupCopy`
1. `MarkupDelete`
1. `MarkupGet`
1. `MarkupGetEx`
1. `MarkupGetExList`
1. `MarkupList`
1. `MarkupPaste`
1. `MarkupSet`
1. `MarkupThumbnail`

## ColumnDataGet

Retrieves the Custom Column data associated with a particular markup and returns the data for more
than one column as a string dictionary, or a single column as a string.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pColumn` [String, Optional, ...]: Column name for which the data is associated

### Example

```js
ColumnDataGet(0, "NDFJKXLKJKLDFY");
ColumnDataGet(0, "NDFJKXLKJKLDFY", "Material", "Subtotal");
```

## ColumnDataGetDict

Retrieves the Custom Column data associated with a particular markup and returns the data as a string
dictionary.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pColumn` [String, Optional, ...]: Column name for which the data is associated

### Example

```js
ColumnDataGetDict(0, "NDFJKXLKJKLDFY");
ColumnDataGetDict(0, "NDFJKXLKJKLDFY", "Material", "Subtotal");
```

## ColumnDataSet

Sets Custom Column data for a particular markup.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pData` [String]: Custom Column data as a string dictionary

### Example

```js
ColumnDataSet(0, "NDFJKXLKJKLDFY", "{'Material':'Glass'}");
```

## ColumnsExport

Exports the Custom Column definition of the active document to an .xml file.

### Parameters

`pFileName` [String]: Filename to export the columns into

### Example

```js
ColumnsExport("columns.xml");
```

## ColumnsImport

Imports a Custom Column definition .xml file into the active document overwriting any existing Custom
Columns. An .xml file can be generated by either the command ColumnsExport, or from within
Bluebeam Revu.

### Parameters

`pFileName` [String]: Filename of the Custom Column definition .xml file to import into the active
`document`

### Example

```js
ColumnsImport("columns.xml");
```

## Export

Exports the markups in the active document to the specified output file optionally using a User ID to filter
on.

### Parameters

`pOuputBAX` [String, Optional]: Filename to export the markups into
`pUserID` [String, Optional]: User ID as used in bFX File Exchange to filter on when exporting markups

### Example

```js
Export("output.bax");
Export("output.bax", "12345");
```

## Flatten

Takes the active document and flattens all markups to be part of the page content.

### Parameters

`pRecoverable` [Bool, Optional]: Specifies whether or not the flatten process is reversible
`pFlags` [Number, Optional]: Specifies what type of markups to flatten
`Default` = 8191
`Image` = 1
`Ellipse` = 2
`Stamp` = 4
`Snapshot` = 8
`Text` and Callout = 16
`Ink` and Highlighter = 32
`Line` and Dimension = 64
`Measure` Area = 128
`Polyline` = 256
`Polygon` and Cloud = 512
`Rectangle` = 1024
`Text` Markups = 2048
`Group` = 4096
`File` Attachment = 8192
`Flags` = 16384
`Notes` = 32768
`Form` Fields = 65536
`Add` together all values that should be flattened
`pPageRange` [String, Optional]: List or range of pages to be flattened, -1 will flatten all pages, exp: 1,2,10-20
`pLayerName` [String, Optional]: Layer Name to flatten markups to
`Example`
`Flatten`()
`Flatten`(true)
`Flatten`(true, 9) % Flattens Images (1) and Snapshots (8)

## Import

Imports the markups from list of files specified as parameters into the active document.

### Parameters

`pBAXorPDF` [String, ...]: Filename of a bax or pdf file to import into the active document

### Example

```js
Import("markups1.bax", "markups2.bax" ...)
Import("revA.pdf" ...)
Import("markups1.bax", "revB.pdf" ...)
```

## MarkupCaptureExport

Exports the photos and videos attached to the markup.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pFolder` [String, Optional]: The folder to extract the attachments to. If the folder does not exist it will be created. By default the folder will be the markup ID

## MarkupCopy

Returns an xml string that contains raw markup data that can be passed into MarkupPaste to be
placed at a new location. If the markup is the parent of a group, then the whole group will be copied.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup

### Example

```js
MarkupCopy(1, "YIBKQIOZSROMNDGD");
```

## MarkupDelete

Deletes a particular markup from the active document.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup

### Example

```js
MarkupDelete(1, "YIBKQIOZSROMNDGD");
```

## MarkupGet

Retrieves the properties associated with a particular markup that returns multiple properties as a string
dictionary, or a single property as a string. Refer to the Markups section for description of the available
properties.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pProperty` [String, Optional, ...]: Particular markup property to retrieve

### Example

```js
MarkupGet(1, "YIBKQIOZSROMNDGD");
MarkupGet(1, "YIBKQIOZSROMNDGD", "subject");
MarkupGet(1, "YIBKQIOZSROMNDGD", "type", "comment");
```

## MarkupGetEx

Retrieves the properties, including the custom ones, associated with a particular markup and returns
those properties as a string dictionary, or a single property as a string. Refer to the Markups section for
description of the available properties.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pProperty` [String, Optional, ...]: Particular markup property to retrieve

### Example

```js
MarkupGetEx(1, "YIBKQIOZSROMNDGD");
MarkupGetEx(1, "YIBKQIOZSROMNDGD", "subject");
MarkupGetEx(1, "YIBKQIOZSROMNDGD", "type", "comment");
```

## MarkupGetExList

Retrieves all of the properties, including the custom ones,for all of the markups on a given page as a
string dictionary,or a single property as a string. Refer to the Markups section for description of the
available properties.

### Parameters

`pPageIndex` [Number]: Page Index

### Example

```js
MarkupGetExList(1);
```

## MarkupList

Retrieves the list of markup IDs associated with a particular page.

### Parameters

`pPageIndex` [Number]: Page Index

### Example

```js
MarkupList(1);
```

## MarkupPaste

Pastes a markup passed in as raw XML at the coordinates provided. The raw XML would have been
returned from a call to MarkupCopy. Returns a list of markup IDs of the pasted markups.

### Parameters

`pPageIndex` [Number]: Page Index of paste destination
`pXML` [String]: XML string containing raw markup data
`pX` [Number]: X coordinate of paste location in points (72 points per inch)
`pY` [Number]: Y coordinate of paste location in points (72 points per inch)

### Example

```js
MarkupPaste(1, "< ... Raw XML returned from MarkupCopy( ... ) ...>", 144, 72);
```

## MarkupSet

Sets properties for a particular markup. The data is passed in as a string dictionary containing key/value
pairs. Refer to the Markups section for description of the available properties.

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pData` [String]: Markup properties as a string dictionary

### Example

MarkupSet(1, "YIBKQIOZSROMNDGD", "{'comment':'The color is red','color':'#FF0000'}")

## MarkupThumbnail

Generates a thumbnail of a markup. If the markup is the parent of a group, then the whole group will be rendered. Can have an extension of most common image formats including (.bmp, .png, .jpg ...).

### Parameters

`pPageIndex` [Number]: Page Index of the markup
`pMarkupID` [String]: ID associated with the markup
`pWidth` [Number]: Desired width in pixels of output thumbnail image
`pHeight` [Number]: Desired height in pixels of output thumbnail image
`pPercentage` [Number]: Desired percentage of the thumbnail that the markup should cover
`pIncludePageContent` [Bool]: Boolean value specifying if the thumbnail should include the background page content
`pFilename` [String]: Filename of desired output thumbnail image
`pIncludeAllMarkups` [Bool, Optional]: Boolean value specifying if all markups on the page should be included in the thumbnail

### Example

```js
MarkupThumbnail(1, "YIBKQIOZSROMNDGD", 256, 256, 0.5, true, "thumb.png", false);
```
