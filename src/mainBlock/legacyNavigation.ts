type GoSubBoard = (
  subCode: string,
  boardTitle: string,
  reserved: string,
  tableId: string,
) => void;

type WindowWithLegacyBoard = Window & {
  GoSubBoard?: GoSubBoard;
};

export function openLegacyBoard(
  subCode: string,
  boardTitle: string,
  tableId: string,
  fallbackPath: string,
) {
  const legacyWindow = window as WindowWithLegacyBoard;

  if (typeof legacyWindow.GoSubBoard === "function") {
    legacyWindow.GoSubBoard(subCode, boardTitle, "", tableId);
    return;
  }

  const query = new URLSearchParams({
    subCode,
    boardTitle,
    tableId,
  });

  window.location.href = `${fallbackPath}?${query.toString()}`;
}
