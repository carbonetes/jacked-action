
// File Import
import { Keywords } from './util/keywords';

// Class
const keywords = new Keywords();


// Check if user input failCriteria is valid severity
export function checkSeverityInput(failCriteria: string): void {
    if (failCriteria !== "") {
        if (keywords.SEVERITY_TYPE.includes(failCriteria)) {
            console.log("InputSeverity exists in SEVERITY_TYPE");
        } else {
            console.log("InputSeverity does not exist in SEVERITY_TYPE");
            process.exit(1); // Exit with a non-zero status code indicating an error
        }
    }
}