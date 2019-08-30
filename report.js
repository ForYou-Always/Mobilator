'use strict';

module.exports = function(Report) {
	require('../../server/hook-creator-mods')(Report);
	require('../../server/hook-delete-mods')(Report);
	require('../../server/hook-find-mods')(Report);
	require('../../server/hook-file-metadata-mods')(Report);
	require('../../server/hook-distance-mods')(Report);
	require('../../server/hook-thumbnail-mods')(Report);
	require('../../server/hook-thumbnails-mods')(Report);
	require('../../server/hook-violation-mods')(Report);
	require('../../server/remotemethod-public')(Report);

	Report.getRecentReports = async () => {
		var fields = {
			active: true, 
			price: true, 
			description: true
		}
		var response = await Report.find({fields, limit: 10 });
		return response.length;
	};
	
	Report.remoteMethod(
			'getRecentReports', {
				http: {
					path: '/recentreports',
					verb: 'get'
				},
				returns: {
					arg: 'result',
					type: 'object'
				}
			}
	);
	
};
