var Sequelize = require('./index')
  , AbstractQuery = require('./lib/dialects/abstract/query')
  , Model = require('./lib/model')
  , fs = require('fs')
  , data = JSON.parse(fs.readFileSync('perf.json'))
  , sequelize = new Sequelize('sequelize_test', 'sequelize_test', '', {
    dialect: 'postgres',
    host: '172.17.0.2',
    logging: false
  })
  , AREAS = ['area1', 'area2', 'area3']
  , DAMAGE_MAX = 3;

var Report = sequelize.define('Report', {
  area: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [AREAS]
    }
  },
  damageLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: "Must be an integer"
      },
      min: 0,
      max: DAMAGE_MAX
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
});

var Location = sequelize.define('Location', {
  latitude: {
    type: Sequelize.FLOAT(53),
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Must be a floating point number"
      },
      min: -90.0,
      max: 90.0
    }
  },
  longitude: {
    type: Sequelize.FLOAT(53),
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Must be a floating point number"
      },
      min: -180.0,
      max: 180.0
    }
  },
  altitude: {
    type: Sequelize.FLOAT(53),
    allowNull: true,
    defaultValue: null
  }
});

var Employee = sequelize.define('Employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Location.hasMany(Report);
Report.belongsTo(Location);

Employee.hasMany(Report);
Report.hasMany(Employee);

/*{
  include: [
    {model: Report, include: [Employee]}
  ]
}*/


var tableNames = {};
tableNames[Location.tableName] = true;
/*var options = {
  include: [
    {model: Report, include: [Employee]}
  ]
};
Model.$validateIncludedElements.call(Location, options, tableNames);*/

var start = new Date();
var result;

/*function printStatus(fn) {
    switch(%GetOptimizationStatus(fn)) {
        case 1: console.log("Function is optimized"); break;
        case 2: console.log("Function is not optimized"); break;
        case 3: console.log("Function is always optimized"); break;
        case 4: console.log("Function is never optimized"); break;
        case 6: console.log("Function is maybe deoptimized"); break;
    }
}

//Fill type-info
result = AbstractQuery.$groupJoinData(data, {
  model: Location,
  includeMap: options.includeMap,
  includeNames: options.includeNames
}, {
  checkExisting: true
});

console.log("---------------");
console.log("---------------");
console.log("---------------");
%OptimizeFunctionOnNextCall(AbstractQuery.$groupJoinData);*/
//The next call
var options = {
  include: [
    {model: Report, include: [Employee]}
  ]
};
Model.$validateIncludedElements.call(Location, options, tableNames);
for (var i = 0; i < 10; i++) {
  result = AbstractQuery.$groupJoinData(data, {
    model: Location,
    includeMap: options.includeMap,
    includeNames: options.includeNames
  }, {
    checkExisting: true
  });
}

//Check
console.log("$groupJoinData");
//printStatus(AbstractQuery.$groupJoinData);

console.log("finish, took " + (new Date() - start));
console.log(result.length);
//console.log(JSON.stringify(result[result.length - 1], null, '\t'));