'use strict';

const CONTAINERS_URL = '/api/containers/';
const Promise = require('bluebird');

module.exports = function(File) {

  File.upload = (ctx, options, cb) => {
    Promise.coroutine(function* () {
      if(!options) options = {};
      ctx.req.params.container = 'common';
      const userId = parseInt(ctx.req.query.user_id, 10);

      File.app.models.container.upload = Promise.promisify(File.app.models.container.upload);
      const fileObj = yield File.app.models.container.upload(ctx.req, ctx.result, options);
      const fileInfo = fileObj.files.file[0];

      const obj = yield File.create({
        name: fileInfo.name,
        type: fileInfo.type,
        container: fileInfo.container,
        url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
      });

      const User = File.app.models.User;
      const whereClause = { id: userId };
      const data = { avatar_url: obj.url };
      console.log(data);

      yield User.updateAll(whereClause, data);
      cb(null, obj);

    })()
      .catch((error) => cb(error));
  };

  File.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );

};
