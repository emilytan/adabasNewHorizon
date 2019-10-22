import { RESTAdaMap, adaType } from '@ada-new-horizon/api-interfaces';
import { AdabasMap, Adabas } from 'adabas-tcp';

export function parseAdaMap(maps: Array<RESTAdaMap>, fnr?: number): AdabasMap {
    let adamap = new AdabasMap(fnr);
    console.log('checkmaps',maps);
    maps.forEach(map => {
        if (map.type === adaType.GROUP) {
            adamap.group(parseAdaMap(map.child), map.shortname, { name: map.longname });
        } else if (map.type === adaType.PERIODIC) {
            adamap.group(parseAdaMap(map.child), map.shortname, { name: map.longname, occ: map.occ });
        } else if (map.type === adaType.ALPHA) {
            adamap.alpha(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.BINARY) {
            adamap.binary(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.FIXED) {
            adamap.fixed(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.FLOAT) {
            adamap.float(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.PACKED) {
            adamap.packed(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.UNPACKED) {
            adamap.unpacked(map.size, map.shortname, { name: map.longname });
        } else if (map.type === adaType.WIDE) {
            adamap.wide(map.size, map.shortname, { name: map.longname });
        }
    });

    return (adamap);
}