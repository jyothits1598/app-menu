import { format } from 'path';

export function FileExtentionValidator(formats: Array<string>): (file: File) => string | null {
    // var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    // if(formats.find(format=>ext == format)) return true;
    // else return false;

    return (file: File) => {
        const fileFormats = formats;
        const fileExt = file.name.substring(file.name.lastIndexOf('.'));
        if (fileFormats.find((fmt => fmt === fileExt))) return null;
        else return 'valid file type - [ ' + fileFormats.toString() + ' ]';
    }
}