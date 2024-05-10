export interface HasuraEventPayload {
    event: HasuraEventPayloadEvent;
    created_at: string;
    id: string;
    delivery_info: HasuraEventPayloadDeliveryInfo;
    trigger: HasuraEventPayloadTrigger;
    table: HasuraEventPayloadTable;
}

export interface HasuraEventPayloadEvent {
    session_variables: any;
    op: string;
    data: {
        old: any;
        new: {
            context_free: boolean;
            console: string;
            transaction_status: string;
            error_code: number;
            receipt_act_digest: string;
            action_ordinal: number;
            receipt_global_sequence: number;
            transaction_id: string;
            act_name: string;
            receiver: string;
            act_data: string;
            receipt_recv_sequence: number;
            except: string;
            receipt_receiver: string;
            elapsed: number;
            act_account: string;
            receipt_present: boolean;
            block_num: number;
            receipt_code_sequence: number;
            receipt_abi_sequence: number;
            creator_action_ordinal: number;
        };
    };
    trace_context: any;
}

export interface HasuraEventPayloadDeliveryInfo {
    max_retries: number;
    current_retry: number;
}

export interface HasuraEventPayloadTrigger {
    name: string;
}

export interface HasuraEventPayloadTable {
    schema: string;
    name: string;
}
