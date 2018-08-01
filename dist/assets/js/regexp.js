"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-useless-escape: 0 */
exports.default = {
    langCN: /^[\u4e00-\u9fa5]$/,
    langEN: /[a-zA-Z]/,
    mobile: /^[1][345789][0-9]{9}$/,
    // 6至20位，以字母开头，字母，数字，减号，下划线
    password: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/,
    // 强密码正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    xpassword: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    // 无牌车识别码（纯数字，4-6位）
    rectCode: /^\d{4,6}$/,
    /**
     * 支持普通7位车牌：闽D12E34, 闽D1234挂
     * 支持8位新能源车牌：闽DD12345, 闽D12345F
     */
    plate: /^[冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新军空海北沈兰济南广成使领A-Z][A-Z]([A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}|[DF][A-HJ-NP-Z0-9][0-9]{4}|[0-9]{5}[DF])$/i
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2V4cC5qcyJdLCJuYW1lcyI6WyJsYW5nQ04iLCJsYW5nRU4iLCJtb2JpbGUiLCJwYXNzd29yZCIsInhwYXNzd29yZCIsImVtYWlsIiwicmVjdENvZGUiLCJwbGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtrQkFDZTtBQUNYQSxZQUFRLG1CQURHO0FBRVhDLFlBQVEsVUFGRztBQUdYQyxZQUFRLHVCQUhHO0FBSVg7QUFDQUMsY0FBVSxpQ0FMQztBQU1YO0FBQ0FDLGVBQVcsaUVBUEE7QUFRWEMsV0FBTyw2REFSSTtBQVNYO0FBQ0FDLGNBQVUsV0FWQztBQVdYOzs7O0FBSUFDLFdBQU87QUFmSSxDIiwiZmlsZSI6InJlZ2V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby11c2VsZXNzLWVzY2FwZTogMCAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBsYW5nQ046IC9eW1xcdTRlMDAtXFx1OWZhNV0kLyxcclxuICAgIGxhbmdFTjogL1thLXpBLVpdLyxcclxuICAgIG1vYmlsZTogL15bMV1bMzQ1Nzg5XVswLTldezl9JC8sXHJcbiAgICAvLyA26IezMjDkvY3vvIzku6XlrZfmr43lvIDlpLTvvIzlrZfmr43vvIzmlbDlrZfvvIzlh4/lj7fvvIzkuIvliJLnur9cclxuICAgIHBhc3N3b3JkOiAvXlthLXpBLVpdKFstX2EtekEtWjAtOV17NSwxOX0pJC8sXHJcbiAgICAvLyDlvLrlr4bnoIHmraPliJnvvIzmnIDlsJE25L2N77yM5YyF5ous6Iez5bCRMeS4quWkp+WGmeWtl+avje+8jDHkuKrlsI/lhpnlrZfmr43vvIwx5Liq5pWw5a2X77yMMeS4queJueauiuWtl+esplxyXG4gICAgeHBhc3N3b3JkOiAvXi4qKD89Lns2LH0pKD89LipcXGQpKD89LipbQS1aXSkoPz0uKlthLXpdKSg/PS4qWyFAIyQlXiYqPyBdKS4qJC8sXHJcbiAgICBlbWFpbDogL14oW0EtWmEtejAtOV9cXC1cXC5dKStcXEAoW0EtWmEtejAtOV9cXC1cXC5dKStcXC4oW0EtWmEtel17Miw0fSkkLyxcclxuICAgIC8vIOaXoOeJjOi9puivhuWIq+egge+8iOe6r+aVsOWtl++8jDQtNuS9je+8iVxyXG4gICAgcmVjdENvZGU6IC9eXFxkezQsNn0kLyxcclxuICAgIC8qKlxyXG4gICAgICog5pSv5oyB5pmu6YCaN+S9jei9pueJjO+8mumXvUQxMkUzNCwg6Ze9RDEyMzTmjIJcclxuICAgICAqIOaUr+aMgTjkvY3mlrDog73mupDovabniYzvvJrpl71ERDEyMzQ1LCDpl71EMTIzNDVGXHJcbiAgICAgKi9cclxuICAgIHBsYXRlOiAvXlvlhoDosavkupHovr3pu5HmuZjnmpbpsoHoi4/mtZnotaPphILmoYLnlJjmmYvokpnpmZXlkInpl73otLXnsqTpnZLol4/lt53lroHnkLzmuJ3kuqzmtKXmsqrmlrDlhpvnqbrmtbfljJfmsojlhbDmtY7ljZflub/miJDkvb/pooZBLVpdW0EtWl0oW0EtSEotTlAtWjAtOV17NH1bQS1ISi1OUC1aMC055oyC5a2m6K2m5riv5r6zXXsxfXxbREZdW0EtSEotTlAtWjAtOV1bMC05XXs0fXxbMC05XXs1fVtERl0pJC9pLFxyXG59O1xyXG4iXX0=