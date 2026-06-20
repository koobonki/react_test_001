/**
 * 토글 스위치 UI 컴포넌트.
 *
 * 카테고리 Tab 우측의 필터(상품재고, 재고10개 이상)에 사용됩니다.
 * - checkbox input으로 동작 (접근성·키보드 조작 지원)
 * - checked=true → 켜짐, false → 꺼짐
 */
type ToggleSwitchProps = {
  label: string;                    // 스위치 왼쪽에 표시할 텍스트
  checked: boolean;                 // 켜짐/꺼짐 상태
  onChange: (checked: boolean) => void; // 상태 변경 시 App으로 전달
};

export function ToggleSwitch({ label, checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="toggle-switch">
      <span className="toggle-switch-label">{label}</span>
      {/* 실제 on/off 값은 checkbox가 담당 (화면에는 track/thumb만 표시) */}
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
