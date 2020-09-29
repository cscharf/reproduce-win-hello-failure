let windowsSecurityCredentialsUiModule = null;

function getWindowsSecurityCredentialsUiModule() {
    if (windowsSecurityCredentialsUiModule != null) {
        return windowsSecurityCredentialsUiModule;
    }
    try {
        windowsSecurityCredentialsUiModule = require('@nodert-win10-rs4/windows.security.credentials.ui');
        return windowsSecurityCredentialsUiModule;
    } catch (e) {
        console.error(e);
    }
    return null;
}

async function supportsBiometric() {
    const availability = await checkAvailabilityAsync();
    return getAllowedAvailabilities().includes(availability);
}

async function checkAvailabilityAsync() {
    const module = getWindowsSecurityCredentialsUiModule();
    if (module != null) {
        return new Promise((resolve, reject) => {
            try {
                module.UserConsentVerifier.checkAvailabilityAsync((error, result) => {
                    if (error) {
                        return resolve(null);
                    }
                    return resolve(result);
                });
            } catch (e) {
                console.error(e);
                return resolve(null);
            }
        });
    }
    return Promise.resolve(null);
}

function getAllowedAvailabilities() {
    try {
        const module = getWindowsSecurityCredentialsUiModule();
        if (module != null) {
            return [
                module.UserConsentVerifierAvailability.available,
                module.UserConsentVerifierAvailability.deviceBusy,
            ];
        }
    } catch (e) {
        console.error(e);
    }
    return [];
}

function getWindowsMajorVersion() {
    if (process.platform !== 'win32') {
        return -1;
    }
    try {
        const version = require('os').release();
        return Number.parseInt(version.split('.')[0], 10);
    }
    catch (e) {
        console.error(e);
    }
    return -1;
}

const version = getWindowsMajorVersion();
console.info(`Windows Major Version: ${version}`);

let supported = false;
supportsBiometric().then(value => supported = value, e => console.error(e));
console.info(`Biometrics Supported: ${supported}`);