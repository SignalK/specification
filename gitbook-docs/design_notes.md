In Signal K every datapoint should have a predictable and unique uri (address). What we want to maintain is to know that vessels.self.data.temp is always at that uri, and what the json form is. So if its an array thats workable. If its a json object with many instance keys, each which has a arbitrary name and the same internal structure that works too.

In fact the two forms  represent the same data but have different uris and thats the crux. Essentially the first is data.item[collection],  where data.item[1] is instance 1, eg the second (0 based) item in the array.

This is no different from data.item as the json object, and data.item.1 as the instance, with the name '1'.

From a code perspective its similar too, the object just has an array of keys. But with objects data.temp.instanceName.value is reliable and always the same.

Does that apply for data.temp[1].value? eg how do you reliably get data.temp.air.value with arrays? 

In signalk or java or js, if I have two values in the array, and add one, then remove the first, suddenly the subscriptions are all wrong. The temp[1] did point to the second (0 based) object in the array, but after removing the first its now temp[0]. Subscriptions to temp[1] are now broken.

For an object temp[air] always gets the temp.air. Adding or removing other keys does not affect 'air'. 

The array problem can be overcome by programming - but basically thats just fixing a problem that can be easily avoided by not using arrays.