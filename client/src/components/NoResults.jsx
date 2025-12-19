import { AlertTriangle } from "lucide-react";

export function NoResults() {
  return (
    <div className="retro-panel no-results-panel">
      <div className="scanline-error"></div>
      
      <div className="error-content">
        <div className="icon-wrapper">
          <AlertTriangle size={80} strokeWidth={1.5} />
        </div>
        
        <h2 className="glitch-error" data-text="DATA_VOID">
          DATA_VOID
        </h2>
        
        <div className="error-details">
          <p>{`>> QUERY_STATUS: COMPLETED`}</p>
          <p>{`>> RECORD_COUNT: 0`}</p>
          <p className="blink-warning">
            {`>> ACTION_REQUIRED: REFINE_SEARCH_PARAMETERS`}
          </p>
        </div>
      </div>
    </div>
  );
}