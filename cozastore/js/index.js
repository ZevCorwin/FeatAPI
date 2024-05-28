const URL_DATA = "https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=0c5337dd-cf75-db38-3651-1b34f1d2dd76&category=1789&page=1&urlKey=dien-thoai-may-tinh-bang";

const fetchData = () => {
    let loadingEl = document.getElementById("loading-tiki");
    loadingEl.innerHTML = "Đang loading sản phẩm từ Tiki...";

    fetch(URL_DATA)
        .then(response => response.json())
        .then(data => {
            console.log(data.data); // data.data is an array of objects
            const listItemEl = document.querySelector(".row.isotope-grid");

            setTimeout(() => {
                loadingEl.innerHTML = "";
                data.data.forEach(item => {
                    const productHTML = `
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                        <!-- Block2 -->
                        <div class="block2">
                            <div class="block2-pic hov-img0">
                                <img src="${item.thumbnail_url}" alt="${item.name}">
                                <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                    Quick View
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l ">
                                    <a href="product-detail.html?productId=${item.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                       ${item.name}
                                    </a>
                                    <span class="stext-105 cl3">
                                        ${item.price.toLocaleString('vi-VN')} VNĐ
                                    </span>
                                </div>
                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    listItemEl.insertAdjacentHTML('beforeend', productHTML);
                    
                });

                // Sau khi thêm các sản phẩm, khởi động lại isotope để sắp xếp lại các phần tử
                const iso = new Isotope(listItemEl, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows'
                });
                iso.arrange();

                // Đảm bảo isotope sắp xếp lại khi thay đổi kích thước màn hình
                window.addEventListener('resize', () => {
                    iso.arrange();
                });

                // Đảm bảo isotope sắp xếp lại khi hình ảnh tải xong
                imagesLoaded(listItemEl, () => {
                    iso.arrange();
                });
            }, 2000);

        });
};
fetchData();



