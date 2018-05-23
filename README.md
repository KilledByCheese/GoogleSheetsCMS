# GoogleSheetsCMS

---

This is a simple CMS. 
It is build with this [Tutorial](https://medium.freecodecamp.org/use-google-sheets-and-google-apps-script-to-build-a-blog-cms-c2eab3fb0b2b) 
Under the [GithubPage](https://killedbycheese.github.io/GoogleSheetsCMS/) you can find a frontend example. 
This GithubPage is build with [Normalize CSS](https://necolas.github.io/normalize.css/). 

---

### The Google Sheet:

The Contents for this Blog are stored on this very simple [Google Sheet](https://docs.google.com/spreadsheets/d/19ScTS56KM0p4LsziDrk35qcuXIIebwcdqMcx2n8jxDw/edit?usp=sharing) 
A Google Forms is used to create new Blog Posts into the Sheet. I need to manually set the Published flag to TRUE so the Apps Script fetches them. 
This [Script](https://script.google.com/macros/d/Md97jiI8FlEDqijGnJC5juPcp0tJNxHqw/edit?uiv=2&mid=ACjPJvESTzEKzl_9vtVgLnj5suFcGOObIZmQPKCP8ak18XTYSxGVV6UXZ9oWWbUd77W-rLX25LVWdvS0jIAcxBGkfzEVK9X7zYaKfyZc7Cw4j08UQQfA5gQ1OP0aNSL5TmaIodjcfpx_6Qc) is used as a Google Apps Script to get the Information form the Sheet. 
You can see the "API" working with URL 
```
https://script.google.com/macros/s/AKfycbyJjyv05dbsKgcvHQCun12VTc-XIVp9i6_p0BiPS_X-9nxg-P5j/exec?key=abcdef
``` 
It returns a JSON with all information. This JSON will be requested by the [main.js](https://github.com/KilledByCheese/GoogleSheetsCMS/blob/master/src/js/main.js) and will be displayed on the Frontend.
