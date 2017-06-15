var task={

    data: {
        person:[{
                    'name': 'Inderjeet Singh',
                    'designation': 'Frontend Dev',
                    'joiningDate' : '23/11/2017',
                    'age': 23
                },{
                    'name': 'Amit Arora',
                    'designation': 'Backend Dev',
                    'joiningDate' : '11/11/2017',
                    'age': 24
                },{
                    'name': 'Prashant Tomer',
                    'designation': 'Devops',
                    'joiningDate' : '18/11/2017',
                    'age': 25
                },{
                    'name': 'Ankit Gupta',
                    'designation': 'Devops',
                    'joiningDate' : '27/11/2017',
                    'age': 64
                }]
    },

    getCookie: function(name){
        var nameEQ = name + "=",
            ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    createCookie: function(name,value){
            document.cookie = name + "=" + value;
    },

    manipulateData: function(cookieNumber){
        const data = task.data.person.map(a => Object.assign({}, a));
            alteredData = {person: []},
            i=1,
            loopdata = {};

            if(cookieNumber >= 0){
                for(var k in data){
                    alteredData.person.push(data[k]);
                    alteredData.person[k].age = parseInt(alteredData.person[k].age.toString().split('').reverse().join(''));
                    alteredData.person[k].joiningDate = (parseInt(alteredData.person[k].joiningDate.slice(0,2))+1).toString()+alteredData.person[k].joiningDate.slice(2,alteredData.person[k].joiningDate.length);
                }
                loopdata.person = (alteredData.person.slice(cookieNumber));                
                alteredData.person = (task.data.person.concat(alteredData.person)).slice(0, (task.data.person.length+cookieNumber));
                task.createList(alteredData);
                
            } else {
                task.createList();
                for(var j in data){
                    task.data.person[j].age = parseInt(task.data.person[j].age.toString().split('').reverse().join(''));
                    task.data.person[j].joiningDate = (parseInt(task.data.person[j].joiningDate.slice(0,2))+1).toString()+task.data.person[j].joiningDate.slice(2,task.data.person[j].joiningDate.length);                    
                    alteredData.person.push(task.data.person[j]);
                }
                loopdata = alteredData;
            }

            var interval = setInterval(function(){
                if(i < (loopdata.person.length+1)){
                        alteredData = {person : []}
                        alteredData.person.push(loopdata.person[i-1]);
                        task.createList(alteredData); 
                        task.createCookie('person', (((i == 0) ? 0 : i)+((cookieNumber >= 0) ? cookieNumber : 0)));
                        // console.log('cookie set ' + (((i == 0) ? 0 : i)+((cookieNumber >= 0) ? cookieNumber : 0)));
                    } else{
                        clearInterval(interval);
                    }
                    i++;
                    
            },60*1000); 
    },

    updateCount: function(n){
        $('.count').text(n);
    },

    checkCookie: function(){
        var getCookie = parseInt(task.getCookie('person')),
        tempData,
        data = { person:[] };
        // console.log('cookie found ' + getCookie,);
        (getCookie != undefined) ? task.manipulateData(getCookie) : task.manipulateData(); 
    },

    createList: function(data){
        var self = this;
        var template = Handlebars.compile($('#listitem').html());
            templateHtml = (data)? template(data) : template(self.data),
            count = 0;
            $('#list').append(templateHtml);
            this.updateCount((data) ? (parseInt($('.count').text()) || 0) + data.person.length : task.data.person.length);
    },

    init: function() {
        this.checkCookie();
    }
};

(function() {
    task.init();
})();