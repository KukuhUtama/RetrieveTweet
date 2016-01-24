var app =  angular.module('app');

app.service('commonEnum', commonEnum);

function commonEnum() {

    var commonEnum = {

        ajaxMethod: {
            get: 'GET',
            post: 'POST',
            put: 'PUT',
            delete: 'DELETE'
        },

        baseApiUrl: {
            base: ''
        },

        webApiUrl: {
    
        },
        templateUrl: {

        },

        sort: {
            ascending: 'asc',
            descending: 'desc'
        }

    }

    return commonEnum;
}