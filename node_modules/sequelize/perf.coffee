Sequelize = require './index'
async = require 'async'

AREAS = ['area1', 'area2', 'area3']
DAMAGE_MAX = 3

sequelize = new Sequelize 'sequelize_test', 'sequelize_test', '',
    dialect: 'postgres'
    host: '172.17.0.2'

Report = sequelize.define 'Report',
    area:
        type: Sequelize.STRING
        allowNull: false
        validate:
            isIn: [AREAS]
    damageLevel:
        type: Sequelize.INTEGER
        allowNull: false
        defaultValue: 0
        validate:
            isInt: msg: "Must be an integer"
            min: 0
            max: DAMAGE_MAX
    description:
        type: Sequelize.TEXT
        allowNull: true
        validate:
            notEmpty: true

Location = sequelize.define 'Location',
    latitude:
        type: Sequelize.FLOAT(53) # double
        allowNull: false
        validate:
            isFloat: msg: "Must be a floating point number"
            min: -90.0
            max: 90.0
    longitude:
        type: Sequelize.FLOAT(53) # double
        allowNull: false
        validate:
            isFloat: msg: "Must be a floating point number"
            min: -180.0
            max: 180.0
    altitude:
        type: Sequelize.FLOAT(53) # double
        allowNull: true
        defaultValue: null

Employee = sequelize.define 'Employee',
    name: 
        type: Sequelize.STRING,
        allowNull: false

Location.hasMany Report
Report.belongsTo Location

Employee.hasMany Report
Report.hasMany Employee

process.argv.shift()
process.argv.shift()

arg = process.argv[0]
if arg is 'seed'
    sequelize.sync(force: true).success ->
        console.log "synced database"
        async.timesSeries 2000, (n, done) ->
            location = null
            async.series [
                (done) ->
                    Location.create
                        latitude: Math.random() * 180 - 90
                        longitude: Math.random() * 360 - 180
                    .success (obj) ->
                        location = obj
                        done()
                    .error (error) ->
                        console.error(error)
                (done) ->
                    async.times 2, (n, done) ->
                        Report.create
                            area: AREAS[n]
                            damageLevel: String Math.floor Math.random() * DAMAGE_MAX
                            description: if Math.random() < 0.1 then "this is a description #{Math.random()}" else null
                        .success (report) ->
                            report.setLocation(location).done done
                        .error (error) ->
                            console.error(error)
                    , done
            ], ->
                console.log n
                done()

        , (error) ->
            throw error if error?
            console.log "done"
    .error (error) ->
        throw error
else if arg is 'run'
    console.log "start"
    start = new Date()
    ###
    Report.findAll
        include: [
            Location
        ]
    .done (err, damageReports) ->
        console.log "finish, took #{new Date() - start}"

    .on 'sql', (sql) ->
        console.log sql
    ###

    Location.findAll
        include: [
            Report
        ]
    .done (err, damageReports) ->
        console.log "finish, took #{new Date() - start}"

    .on 'sql', (sql) ->
        console.log sql
    
else
    console.log "expected to be run with 'seed' or 'run' argument"