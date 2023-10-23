export default interface ICustomSelectRef {
	validateReasonAndPoints: (fields: { reason_all: string; points: string }) => {
		reasonAll: { message: string; hasError: boolean; isValidCustomSelect: boolean };
		points: { message: string; hasError: boolean; isValidCustomSelect: boolean };
	};
  }  