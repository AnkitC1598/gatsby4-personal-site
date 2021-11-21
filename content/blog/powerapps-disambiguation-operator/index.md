---
tags:
  - powerapps
published: true
date: 2020-09-09T20:51:27.029Z
title: PowerApps Disambiguation Operator
---

Recently I've been using PowerApps more frequently and I have noticed that sometimes it auto-fills Data Source names with a notation like `[@'Data Source']`.

I wasn't sure how to find the answer for this since it was not immediately clear how to describe what is happening. But today I found the answer in post from 2016 on the PowerApps community forum:

[How does the "\[@\[@" notation work?](https://powerusers.microsoft.com/t5/Building-Power-Apps/How-does-the-quot-quot-notation-work/m-p/7265#M3274)

> ## \[@global_name]
>
> This is used for global identifier disambiguation. When a global name (such as slider1) collides with another name (for example the name of a column in a table, within an aggregate formula), one can use the \[@name] to refer specifically to the global name, whereas the unqualified name refers to the inner (column) name:
>
> `Filter(MyTable, [@slider1].Value = slider1.Value)`
>
> In the example above, \[@slider1] refers to the global slider1 control, whereas slider1 refers to the hypothetical column name 'slider1' within MyTable.
>
> ## name\[@field]
>
> This is used for row scope disambiguation. In some cases formulas may include nested aggregates that operate on tables with colliding names. For example some column 'CustomerID' that exists in both Customers and Orders. According to the PowerApps Language's scoping rules, the innermost row scope obscures the outer row scope. When access to such colliding field names is desired within the innermost scope, one can use this disambiguation syntax to refer to either the inner or the outer fields explicitly, as necessary. For example:
>
> `Filter(Orders, Amount < LookUp(Customers, CustomerID = Orders[@CustomerID], TypicalAmount))`
>
> In the formula above, CustomerID refers to the field in the innermost row scope (i.e. a field in Customers), whereas Orders\[@CustomerID] refers to the corresponding CustomerID field in the outermost row scope (i.e. a field in Orders).

Of course, this is also documented in the official Microsoft docs:
[Operators and Identifiers in Power Apps](https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/operators#disambiguation-operator)
