export const success = (res: any, message: string, data = {}) => 
    res.status(200).json({ success: true, message, data });

export const error = (res: any, message: string, code = 400) => 
    res.status(code).json({ success: false, message });