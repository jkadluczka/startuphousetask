# JS Recruitment Task

## Approach

First i tachled fetching data. I used fetch to get the data from API. Then, when it was working I took care of pagination, then section and lastly search bar. Each one of them was done similarly by setting up event listening and changing corelating variables. After every change 'rendering' method is triggered so it updates the list on the screen. Saving "read later" articles I've used local storage. When data is supposed to be added it gets the array from local storage (if it's exist), then pushes the new element and finally overwrites old one. If the new entry is not unique methow won't allow the push. Removing is done in analog way. Finally I had to tweak 'rendering' methods. I broke the process on two methods so it is more clear how it goes. It's simple mapping of array of elements to corresponding elements. I switched way of handling clicks to '.addEventListener' in both cases. at the end of both methods innerHtml of containers are cleared and then, using forEach I append all the children I get from mapping.

I would gladly include tests but as you've stated I can't add external library and I can't solve issue with fetch not being read properly. I am used to testing React components with Jest but this unfortunatelly was beyond me. I'm hoping it won't cross me out of the recruitment process.

