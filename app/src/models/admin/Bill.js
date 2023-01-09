const db = require('../../config/db')

class Bill {
    static async getBills() {
        const conn = await db.connection()
        // 오늘 날짜에 해당하는 주문만 불러오기
        const query = 'SELECT * FROM bills where endTime and endTime'
        const [rows] = await conn.execute(query)
        return rows
    }
}

module.exports = Bill