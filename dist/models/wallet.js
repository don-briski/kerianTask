"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
class Wallet {
    constructor(userID) {
        this.userID = userID;
        this.walletID = this.generateUniqueWalletID();
        this.balance = 0;
    }
    generateUniqueWalletID() {
        // For simplicity, we're using a basic random function for the walletID.
        // In a real-world application, you'd want a more robust method for ensuring uniqueness.
        return 'W' + Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
    }
    credit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Credited ${amount} to wallet. New balance: ${this.balance}`);
        }
        else {
            console.error("Amount to credit should be greater than 0");
        }
    }
    debit(amount) {
        if (amount > 0) {
            if (this.balance >= amount) {
                this.balance -= amount;
                console.log(`Debited ${amount} from wallet. New balance: ${this.balance}`);
            }
            else {
                console.error("Insufficient funds in the wallet");
            }
        }
        else {
            console.error("Amount to debit should be greater than 0");
        }
    }
}
exports.Wallet = Wallet;
// Example usage:
const userWallet = new Wallet("USER123456");
userWallet.credit(500);
userWallet.debit(100);
