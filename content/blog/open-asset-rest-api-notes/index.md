---
tags:
  - openasset
  - rest
  - api
  - json
published: true
date: 2020-06-02T14:34:36.668Z
title: Open Asset REST API Notes
---

## Modifying the GPS coordinates of a File

You can view the location data for a file with the `withLocation=1` query parameter in a GET request like in the examples below:

- `https://tenant.openasset.com/REST/1/Files?withLocation=1 `
- `https://tenant.openasset.com/REST/1/Files/{file_id}?withLocation=1 `

This will return the location field, which can be empty or have pre-existing data:

```js
"location": {},
```

or

```js
"location": {
  "street": "",
  "latitude": 51.596545,
  "postal_code": "",
  "state": "",
  "street_number": "",
  "city": "",
  "longitude": -0.194402777789,
  "google_id": "",
  "country": "",
  "address": "",
  "name": ""
}
```

Everything other than the latitude and longitude can be ignored as they are not actually used in OA at the moment.

To modify the latitude and longitude you can perform a PUT request to a file with a particular id with the new latitude and longitudes.

### Examples

`PUT https://tenant.openasset.com/REST/1/Files?withLocation=1`

- just the files endpoint will require the file id. the example uses 614 as a placeholder

```js
[
  {
    id: 614,
    location: {
      latitude: 51.596545,
      longitude: -0.194402777789,
    },
  },
];
```

`PUT https://tenant.openasset.com/REST/1/Files/{file_id}?withLocation=1`

```js
{
    "location": {
        "latitude": 51.596545,
        "longitude": -0.194402777789
    }
}
```

## Replacing a file

The process for replacing a file with the REST API is similar to the process for uploading a file. Instead of performing a POST, you will need to perform a PUT on the file id that you want to replace.

Here is the documentation for uploading a new file:
https://developers.openasset.com/#create-a-new-file

Please note that you need to use Form-data in your request with the file and \_jsonBody parameters. **The original_filename in the \_jsonBody needs to be exactly the same as the file being used for the uploading.**

Below is an example of this PUT request being carried out on a file with the id of 635:

```json
_jsonBody: [{
    "original_filename": "Jabberwocky_003.jpg"
}]
```
