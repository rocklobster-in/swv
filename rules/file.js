import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function FileRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.accept = properties.accept;
}

FileRule.RULE_NAME = 'file';

Object.setPrototypeOf( FileRule.prototype, AbstractRule.prototype );


/**
 * Map of MIME types. A MIME type in the key; the corresponding file extensions
 * in the value.
 */
FileRule.mimeTypes = new Map( [
	[
		'application/java',
		[ 'class' ]
	],
	[
		'application/javascript',
		[ 'js' ]
	],
	[
		'application/msword',
		[ 'doc' ]
	],
	[
		'application/octet-stream',
		[ 'psd', 'xcf' ]
	],
	[
		'application/onenote',
		[ 'onetoc', 'onetoc2', 'onetmp', 'onepkg' ]
	],
	[
		'application/oxps',
		[ 'oxps' ]
	],
	[
		'application/pdf',
		[ 'pdf' ]
	],
	[
		'application/rar',
		[ 'rar' ]
	],
	[
		'application/rtf',
		[ 'rtf' ]
	],
	[
		'application/ttaf+xml',
		[ 'dfxp' ]
	],
	[
		'application/vnd.apple.keynote',
		[ 'key' ]
	],
	[
		'application/vnd.apple.numbers',
		[ 'numbers' ]
	],
	[
		'application/vnd.apple.pages',
		[ 'pages' ]
	],
	[
		'application/vnd.ms-access',
		[ 'mdb' ]
	],
	[
		'application/vnd.ms-excel',
		[ 'xla', 'xls', 'xlt', 'xlw' ]
	],
	[
		'application/vnd.ms-excel.addin.macroEnabled.12',
		[ 'xlam' ]
	],
	[
		'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
		[ 'xlsb' ]
	],
	[
		'application/vnd.ms-excel.sheet.macroEnabled.12',
		[ 'xlsm' ]
	],
	[
		'application/vnd.ms-excel.template.macroEnabled.12',
		[ 'xltm' ]
	],
	[
		'application/vnd.ms-powerpoint',
		[ 'pot', 'pps', 'ppt' ]
	],
	[
		'application/vnd.ms-powerpoint.addin.macroEnabled.12',
		[ 'ppam' ]
	],
	[
		'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
		[ 'pptm' ]
	],
	[
		'application/vnd.ms-powerpoint.slide.macroEnabled.12',
		[ 'sldm' ]
	],
	[
		'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
		[ 'ppsm' ]
	],
	[
		'application/vnd.ms-powerpoint.template.macroEnabled.12',
		[ 'potm' ]
	],
	[
		'application/vnd.ms-project',
		[ 'mpp' ]
	],
	[
		'application/vnd.ms-word.document.macroEnabled.12',
		[ 'docm' ]
	],
	[
		'application/vnd.ms-word.template.macroEnabled.12',
		[ 'dotm' ]
	],
	[
		'application/vnd.ms-write',
		[ 'wri' ]
	],
	[
		'application/vnd.ms-xpsdocument',
		[ 'xps' ]
	],
	[
		'application/vnd.oasis.opendocument.chart',
		[ 'odc' ]
	],
	[
		'application/vnd.oasis.opendocument.database',
		[ 'odb' ]
	],
	[
		'application/vnd.oasis.opendocument.formula',
		[ 'odf' ]
	],
	[
		'application/vnd.oasis.opendocument.graphics',
		[ 'odg' ]
	],
	[
		'application/vnd.oasis.opendocument.presentation',
		[ 'odp' ]
	],
	[
		'application/vnd.oasis.opendocument.spreadsheet',
		[ 'ods' ]
	],
	[
		'application/vnd.oasis.opendocument.text',
		[ 'odt' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		[ 'pptx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.presentationml.slide',
		[ 'sldx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
		[ 'ppsx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		[ 'potx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		[ 'xlsx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		[ 'xltx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		[ 'docx' ]
	],
	[
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		[ 'dotx' ]
	],
	[
		'application/wordperfect',
		[ 'wp', 'wpd' ]
	],
	[
		'application/x-7z-compressed',
		[ '7z' ]
	],
	[
		'application/x-gzip',
		[ 'gz', 'gzip' ]
	],
	[
		'application/x-msdownload',
		[ 'exe' ]
	],
	[
		'application/x-shockwave-flash',
		[ 'swf' ]
	],
	[
		'application/x-tar',
		[ 'tar' ]
	],
	[
		'application/zip',
		[ 'zip' ]
	],
	[
		'audio/3gpp',
		[ '3gp', '3gpp' ]
	],
	[
		'audio/3gpp2',
		[ '3g2', '3gp2' ]
	],
	[
		'audio/aac',
		[ 'aac' ]
	],
	[
		'audio/flac',
		[ 'flac' ]
	],
	[
		'audio/midi',
		[ 'mid', 'midi' ]
	],
	[
		'audio/mpeg',
		[ 'mp3', 'm4a', 'm4b' ]
	],
	[
		'audio/ogg',
		[ 'ogg', 'oga' ]
	],
	[
		'audio/wav',
		[ 'wav', 'x-wav' ]
	],
	[
		'audio/x-matroska',
		[ 'mka' ]
	],
	[
		'audio/x-ms-wax',
		[ 'wax' ]
	],
	[
		'audio/x-ms-wma',
		[ 'wma' ]
	],
	[
		'audio/x-realaudio',
		[ 'ra', 'ram' ]
	],
	[
		'image/avif',
		[ 'avif' ]
	],
	[
		'image/bmp',
		[ 'bmp' ]
	],
	[
		'image/gif',
		[ 'gif' ]
	],
	[
		'image/heic',
		[ 'heic' ]
	],
	[
		'image/heic-sequence',
		[ 'heic', 'heics' ]
	],
	[
		'image/heif',
		[ 'heic', 'heif' ]
	],
	[
		'image/heif-sequence',
		[ 'heic', 'heifs' ]
	],
	[
		'image/jpeg',
		[ 'jpg', 'jpeg', 'jpe' ]
	],
	[
		'image/png',
		[ 'png' ]
	],
	[
		'image/tiff',
		[ 'tiff', 'tif' ]
	],
	[
		'image/webp',
		[ 'webp' ]
	],
	[
		'image/x-icon',
		[ 'ico' ]
	],
	[
		'text/calendar',
		[ 'ics' ]
	],
	[
		'text/css',
		[ 'css' ]
	],
	[
		'text/csv',
		[ 'csv' ]
	],
	[
		'text/html',
		[ 'htm', 'html' ]
	],
	[
		'text/plain',
		[ 'txt', 'asc', 'c', 'cc', 'h', 'srt' ]
	],
	[
		'text/richtext',
		[ 'rtx' ]
	],
	[
		'text/tab-separated-values',
		[ 'tsv' ]
	],
	[
		'text/vtt',
		[ 'vtt' ]
	],
	[
		'video/3gpp',
		[ '3gp', '3gpp' ]
	],
	[
		'video/3gpp2',
		[ '3g2', '3gp2' ]
	],
	[
		'video/avi',
		[ 'avi' ]
	],
	[
		'video/divx',
		[ 'divx' ]
	],
	[
		'video/mp4',
		[ 'mp4', 'm4v' ]
	],
	[
		'video/mpeg',
		[ 'mpeg', 'mpg', 'mpe' ]
	],
	[
		'video/ogg',
		[ 'ogv' ]
	],
	[
		'video/quicktime',
		[ 'mov', 'qt' ]
	],
	[
		'video/webm',
		[ 'webm' ]
	],
	[
		'video/x-flv',
		[ 'flv' ]
	],
	[
		'video/x-matroska',
		[ 'mkv' ]
	],
	[
		'video/x-ms-asf',
		[ 'asf', 'asx' ]
	],
	[
		'video/x-ms-wm',
		[ 'wm' ]
	],
	[
		'video/x-ms-wmv',
		[ 'wmv' ]
	],
	[
		'video/x-ms-wmx',
		[ 'wmx' ]
	],
] );


/**
 * Converts a MIME type string to an array of corresponding file extensions.
 *
 * @param {string} mime - MIME type. Wildcard (*) is available for the subtype.
 * @return {string[]} Corresponding file extensions.
 */
FileRule.convertMimeToExt = mime => {
	const results = [];

	const found = mime.match(
		/^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i
	);

	if ( found ) {
		const toplevel = found.groups.toplevel.toLowerCase();
		const sub = found.groups.sub.toLowerCase();

		for ( const [ key, value ] of FileRule.mimeTypes ) {
			if (
				key === found[ 0 ] ||
				'*' === sub && key.startsWith( toplevel + '/' )
			) {
				results.push( ...value );
			}
		}
	}

	return results;
};


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
FileRule.prototype.validate = function ( formDataTree, context ) {
	const files = flattenTree( formDataTree.getAllFiles( this.field ) );

	if ( ! files.length ) {
		return true;
	}

	const isAcceptableFile = file => {
		if ( file instanceof File ) {
			return this.accept?.some( fileType => {
				if ( /^\.[a-z0-9]+$/i.test( fileType ) ) {
					return file.name.toLowerCase().endsWith( fileType.toLowerCase() );
				} else {
					return FileRule.convertMimeToExt( fileType ).some( ext => {
						ext = '.' + ext.trim();
						return file.name.toLowerCase().endsWith( ext.toLowerCase() );
					} );
				}
			} );
		}

		return false;
	};

	for ( const file of files ) {
		if ( ! isAcceptableFile( file ) ) {
			throw new Invalidity( this, { cause: file } );
		}
	}

	return true;
}
