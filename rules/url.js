import { ValidationError } from '../error';

/**
 * Verifies URL fields have URL values.
 */
export const url = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAbsoluteUrl = text => {
		text = text.trim();

		if ( '' === text ) {
			return false;
		}

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
