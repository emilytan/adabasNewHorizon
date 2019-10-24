import { RESTAdaMap, adaType } from '@ada-new-horizon/api-interfaces';
import { AdabasMap, Adabas } from 'adabas-tcp';

export function parseAdaMap(maps: Array<RESTAdaMap>, fnr?: number): AdabasMap {
    let adamap = new AdabasMap(fnr);
    console.log('checkmaps', maps);
    if (maps) {
        maps.forEach(map => {
            if (map.type === adaType.GROUP) {
                adamap.group(parseAdaMap(map.child), map.shortname, { name: map.longname });
            } else if (map.type === adaType.PERIODIC) {
                adamap.group(parseAdaMap(map.child), map.shortname, { name: map.longname, occ: map.occ });
            } else if (map.type === adaType.ALPHA) {
                adamap.alpha(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.BINARY) {
                adamap.binary(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.FIXED) {
                adamap.fixed(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.FLOAT) {
                adamap.float(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.PACKED) {
                adamap.packed(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.UNPACKED) {
                adamap.unpacked(Number(map.size), map.shortname, { name: map.longname });
            } else if (map.type === adaType.WIDE) {
                adamap.wide(Number(map.size), map.shortname, { name: map.longname });
            }
        });
    }


    return (adamap);
}
export function fieldToMap(fields: Array<string>, fdt: Array<any>, fnr?: number): AdabasMap {
    let adamap = new AdabasMap(fnr);
    fields.forEach(fieldName => {
        console.log('fieldName', fieldName);
        const f = fdt.find(a => {
            if (a.name === fieldName){
                return a;
            }
        });
        console.log('check f ',f);
        if (f.type) {
            if (f.type === 'GR') {
                adamap.group(new AdabasMap(), fieldName, { name: fieldName });
            } else if (f.type === 'PE') {
                adamap.group(new AdabasMap(), fieldName, { name: fieldName, occ: 1000 });
            }
        } else if (f.format === 'A') {
            adamap.alpha(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'B') {
            adamap.binary(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'F') {
            adamap.fixed(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'G') {
            adamap.float(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'P') {
            adamap.packed(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'U') {
            adamap.unpacked(f.length, fieldName, { name: fieldName });
        } else if (f.format === 'W') {
            adamap.wide(f.length, fieldName, { name: fieldName });
        }
    });
    return adamap;
}
