# Kofile API

## Getting started
- Install Node.js 4.0 or newer
- `git clone https://github.com/alamuv/kofile.git`
- Run `npm install`
- Run `npm start`

## Unit tests
This repo includes basic unit tests which run on  mocha/chai/supertest.
- Run `npm test`

## Testing API endpoints
Using curl,

1) /orders/prices
- `curl -i http://localhost:8000/orders/prices 
  -X POST 
  -H  "Content-Type:application/json" 
  -d '[
  {
    "order_date": "1/11/2015",
    "order_number": "20150111000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 3
      },
      {
        "type": "Real Property Recording",
        "pages": 1
      }
    ]
  },
  {
    "order_date": "1/17/2015",
    "order_number": "20150117000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 2
      },
      {
        "type": "Real Property Recording",
        "pages": 20
      }
    ]
  },
  {
    "order_date": "1/18/2015",
    "order_number": "20150118000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 5
      },
      {
        "type": "Birth Certificate",
        "pages": 1
      }
    ]
  },
  {
    "order_date": "1/23/2015",
    "order_number": "20150123000001",
    "order_items": [
      {
        "type": "Birth Certificate",
        "pages": 1
      },
      {
        "type": "Birth Certificate",
        "pages": 1
      }
    ]
  }
]'`

2) /orders/distribution
- `curl -i http://localhost:8000/orders/distribution
  -X POST 
  -H  "Content-Type:application/json" 
  -d '[
  {
    "order_date": "1/11/2015",
    "order_number": "20150111000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 3
      },
      {
        "type": "Real Property Recording",
        "pages": 1
      }
    ]
  },
  {
    "order_date": "1/17/2015",
    "order_number": "20150117000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 2
      },
      {
        "type": "Real Property Recording",
        "pages": 20
      }
    ]
  },
  {
    "order_date": "1/18/2015",
    "order_number": "20150118000001",
    "order_items": [
      {
        "type": "Real Property Recording",
        "pages": 5
      },
      {
        "type": "Birth Certificate",
        "pages": 1
      }
    ]
  },
  {
    "order_date": "1/23/2015",
    "order_number": "20150123000001",
    "order_items": [
      {
        "type": "Birth Certificate",
        "pages": 1
      },
      {
        "type": "Birth Certificate",
        "pages": 1
      }
    ]
  }
]'`


