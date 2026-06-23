/**
 * 토글 스위치 UI (체크박스를 스위치 모양으로 표시).
 *
 * App.jsx에서 "상품재고", "항상 펼침" 옵션에 사용합니다.
 */
export function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="toggle-switch">
      <span className="toggle-switch-label">{label}</span>
      <input
        type="checkbox"
        className="toggle-switch-input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-switch-track" aria-hidden="true">
        <span className="toggle-switch-thumb" />
      </span>
    </label>
  );
}
