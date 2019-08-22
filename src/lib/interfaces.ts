export type sybaseResult = Set<string>;

export type vatsNumbersResult = string[];

export type allTerminalsResult = Array<{number: string, ip: string | null}>;

export interface IRtuResult {
    allTerminals: allTerminalsResult;
    vatsNumbers: vatsNumbersResult;
}
export interface IStatsNumbers {
    allNumbersOnRtu: number;
    allVatsNumbers: number;
    numbersIncludeContract: number;
    vatsNumbersIncludeContract: number;
}

export interface IStatsNumbersLocation {
    numbersOnVoipGw: number;
    zel22: number;
    shochina5: number;
    nishegorodskay5: number;
    pionerskay2: number;
    ats9: number;
    ats7: number;
    ats2: number;
}

export interface IAllStats extends IStatsNumbers, IStatsNumbersLocation {
}
