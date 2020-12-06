import FDObjectModel from "../orm/FDObjectModel.js";


// this function converts raw csv data to array of objects
function processDataFromFile(data) {
    if (data) {
        let split = data.split('\n');
        let headers = split.shift();

        return split.map((item, index) => {
            //sux handling in subarray of pictures, in order for parser to "work"
            let allPics = item.substr(item.indexOf('"') + 1, item.lastIndexOf('"')).split(',').join(':::');
            let newStr = item.replace(item.substring(item.indexOf('"') + 1, item.lastIndexOf('"')), allPics);
            let obj = new FDObjectModel();
            let subArr = newStr.split(',');
            let keys = Object.getOwnPropertyNames(obj);
            let tmp = keys;
            if (keys.length > subArr.length) {
                tmp = subArr;
            }
            for (let i = 0; i < tmp.length; i++) {
                obj[keys[i]] = subArr[i];
            }
            return obj;
        });
    }
    return null;
}

// let str = "Electronic Cigarettes,200003561,4Pcs Vape Pods 1.0ml Capacity Cartridge Pod 1.4ohm Coil Resistance Refillable Pod for e-Cigarettes Starter Kit,33013777453,https://ae01.alicdn.com/kf/HTB1_uTOe2WG3KVjSZFgq6zTspXas/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg_220x220.jpg,\"https://ae01.alicdn.com/kf/HTB1_uTOe2WG3KVjSZFgq6zTspXas/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg,https://ae01.alicdn.com/kf/HTB1dgjOe3mH3KVjSZKzq6z2OXXaF/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg,https://ae01.alicdn.com/kf/HTB1x3jOe3mH3KVjSZKzq6z2OXXap/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg,https://ae01.alicdn.com/kf/HTB16UjPe8OD3KVjSZFFq6An9pXaN/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg,https://ae01.alicdn.com/kf/HTB1EnLOe2WG3KVjSZPcq6zkbXXaN/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e.jpg,\",https://www.aliexpress.com/item/4Pcs-Vape-Pods-1-0ml-Capacity-Cartridge-Pod-1-4ohm-Coil-Resistance-Refillable-Pod-for-e/33013777453.html,12.98,9.99,8.00%,2024-07-04,23%,http://s.click.aliexpress.com/e/bSisrrUy";


// processDataFromFile(str);


export {processDataFromFile}