# AdaNewHorizon

This project gives a user interface to managing data of Adabas Database.
It utilizes Adabas TCP feature via the help of adabas-tcp Node.js module to access any Adabas Database remotely.
On another vision, is to reduce the gap of a use from understanding how data are being consumed in Adabas, such as the CRUD access methods. This is done via a new querying method that are similar to SQL query and then converting it to Adabas calls.

## Installation

- Clone this project
- Go to cloned directory
- Run `npm install`

## Starting a development environment

The project comprises of 2 parts, frontend (Angular) and backend (NestJS). Both of this will need to be started to start the development environment.

To start a frontend (Angular):
`
npm run start
`

To start backend server (NestJS):
`
ng serve api
`

## Backend server (NestJS) API

### Read
By File ID:
`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/read/fileid/<fileid>`

- Optional body param: map for AdabasMap

    Content-Type : application/json
    
        {
            "map": [
                {
                    "type": "ALPHA",
                    "shortname": "AA",
                    "longname": "testAA",
                    "size": "8"
                },
                {
                    "type": "GROUP",
                    "shortname": "AB",
                    "longname": "testAB",
                    "child": [
                        {
                            "type": "ALPHA",
                            "shortname": "AC",
                            "longname": "testAC",
                            "size": 20
                        }
                    ]
                }
            ]
        }



By File ID for selected ISN:
`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/read/fileid/<fileid>/isn/<isnid>`

- Optional body param: map for AdabasMap

    Content-Type : application/json
    
        {
            "map": [
                {
                    "type": "ALPHA",
                    "shortname": "AA",
                    "longname": "testAA",
                    "size": "8"
                },
                {
                    "type": "GROUP",
                    "shortname": "AB",
                    "longname": "testAB",
                    "child": [
                        {
                            "type": "ALPHA",
                            "shortname": "AC",
                            "longname": "testAC",
                            "size": 20
                        }
                    ]
                }
            ]
        }

By File ID for certain criteria:
`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/read/fileid/<fileid>/criteria`

- Compulsory body param: `criteria` for filtering criteria
- Optional body param: `map` for AdabasMap

    Content-Type : application/json
    
        {
            "criteria":"AA=testAA",
            "map": [
                {
                    "type": "ALPHA",
                    "shortname": "AA",
                    "longname": "testAA",
                    "size": "8"
                },
                {
                    "type": "GROUP",
                    "shortname": "AB",
                    "longname": "testAB",
                    "child": [
                        {
                            "type": "ALPHA",
                            "shortname": "AC",
                            "longname": "testAC",
                            "size": 20
                        }
                    ]
                }
            ]
        }

### Create

`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/create/fileid/<fileid>`

- Compulsory body param: `object` that is stored
- Optional body param: `map` for AdabasMap

    Content-Type : application/json
    
        {
            "object": {
                "AA": "00000001",
                "AB": {
                    "AC": "ALEXANDRE",
                    "AE": "BLOND",
                    "AD": ""
                },
                "AF": "M",
                "AG": "M",
                "AH": 999999,
                "A1": {
                    "AI": [
                        "3 RUE DE GRANBY"
                    ],
                    "AJ": "ST-ETIENNE",
                    "AK": "42100",
                    "AL": "F"
                },
                "A2": {
                    "AN": "1033",
                    "AM": "42452720"
                },
                "AO": "VENT56",
                "AP": "CHEF DE SERVICE",
                "AQ": [
                    {
                        "AR": "EUR",
                        "AS": 1036,
                        "AT": [
                            29
                        ]
                    }
                ],
                "A3": {
                    "AU": 19,
                    "AV": 5
                },
                "AW": [
                    {
                        "AX": 19990701,
                        "AY": 19990731
                    }
                ],
                "AZ": [
                    "FRE",
                    "ENG"
                ]
            }
        }

### Update

`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/update/fileid/<fileid>`

- Compulsory body param: `object` that is stored
- Compulsory body param: `criteria` for filtering criteria
- Optional body param: `map` for AdabasMap

    Content-Type : application/json
    
        {
            "object": { "testAA":"00000001"
                        },
            "criteria": "testAA=50005500",
            "map": [
                {
                    "type": "ALPHA",
                    "shortname": "AA",
                    "longname": "testAA",
                    "size": 8
                },
                {
                    "type": "GROUP",
                    "shortname": "AB",
                    "longname": "testAB",
                    "child": [
                        {
                            "type": "ALPHA",
                            "shortname": "AC",
                            "longname": "testAC",
                            "size": 20
                        }
                    ]
                }
            ]
        }

### Delete

`http://<NestJS host>:<NestJS port>/api/<DB host>/<DB port>/delete/fileid/<fileid>`

- Compulsory body param: `object` that is stored
- Compulsory body param: `criteria` for filtering criteria
- Optional body param: `map` for AdabasMap

    Content-Type : application/json
    
        {
            "criteria":"testAA=50005800",
            "map": [
                {
                    "type": "ALPHA",
                    "shortname": "AA",
                    "longname": "testAA",
                    "size": 8
                },
                {
                    "type": "GROUP",
                    "shortname": "AB",
                    "longname": "testAB",
                    "child": [
                        {
                            "type": "ALPHA",
                            "shortname": "AC",
                            "longname": "testAC",
                            "size": 20
                        }
                    ]
                }
            ]
        }

### Browse file

`http://<NestJS host>:<NestJS port>/api/fileio/browsefile`

- Optional body param: `path` for directory to browse(initial and default will be `<apps running path>/apiFolder`)

    Content-Type : application/json
        {
            "path":"anyfolder"
        }

### Read file

`http://<NestJS host>:<NestJS port>/api/fileio/readfile`

- Compulsary body param: `file` for directory to browse (initial and default will be `<apps running path>/apiFolder`)

    Content-Type : application/json
        {
            "file":"anypath/filename.txt"
        }

### Write file

`http://<NestJS host>:<NestJS port>/api/fileio/writefile`

- Compulsary body param: `file` for directory to browse (initial and default will be `<apps running path>/apiFolder`)
- Compulsary body param: `content` that is stored (`\n` stand for new line)

    Content-Type : application/json
        {
            "file":"aaa.txt",
            "content":"test testing\njdflkjsldkfj123"
        }

