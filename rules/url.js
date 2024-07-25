import { ValidationError } from '../error';

export const url = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isAbsoluteUrl = text => {
		try {
			const urlObj = new URL( text );
			const protocol = urlObj.protocol.replace( /:$/, '' );
			return isAllowedProtocol( protocol );
		} catch {
			return false;
		}
	};

	const isAllowedProtocol = protocol => {
		// https://developer.wordpress.org/reference/functions/wp_allowed_protocols/
		const allowedProtocols = [ 'http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'irc6', 'ircs', 'gopher', 'nntp', 'feed', 'telnet', 'mms', 'rtsp', 'sms', 'svn', 'tel', 'fax', 'xmpp', 'webcal', 'urn' ];

		return -1 !== allowedProtocols.indexOf( protocol );
	};

	if ( ! values.every( isAbsoluteUrl ) ) {
		throw new ValidationError( this );
	}
};
