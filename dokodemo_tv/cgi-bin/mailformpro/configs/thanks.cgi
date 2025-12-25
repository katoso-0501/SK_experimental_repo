$config{'about'} = 'Thanks Module';

## パラメータ保存の有効期限(秒数)
$config{'thanks.expire'} = 30;

## 取得可能ホスト(サンクスページのドメイン)
$config{'thanks.domain'} = $ENV{'HTTP_HOST'};

## 環境変数を含める(1:ON / 0:OFF)
$config{'thanks.env'} = 1;
1;